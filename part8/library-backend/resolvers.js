const { AuthenticationError, UserInputError } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const JWT_SECRET = process.env.SECRET;

const pubSub = new PubSub();

const resolvers = {
  Query: {
    me: (_root, _args, context) => {
      return context.currentUser;
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_root, args) => {
      const argsAuthor = await Author.findOne({ name: args.author });
      const books = await Book.find({
        ...(argsAuthor && { author: argsAuthor.id }),
        ...(args.genre && { genres: { $in: [args.genre] } }),
      });
      const temp = books.map(async (book) => {
        const author = await Author.findById(book.author);
        return {
          ...book.toObject(),
          id: book.id,
          author: author.toObject(),
        };
      });
      return temp;
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({});
      const temp = authors.map((author) => ({
        ...author.toObject(),
        bookCount: books.filter(
          (book) => book.author.toString() === author.id.toString()
        ).length,
      }));
      return temp;
    },
  },
  Mutation: {
    addBook: async (_root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      try {
        const book = new Book({ ...args });
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
          book.author = newAuthor;
        } else {
          book.author = author;
        }
        await book.save();

        pubSub.publish("BOOK_ADDED", { bookAdded: book });
        return book;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: async (_root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user.id,
      };

      return { token: jwt.sign(userForToken, JWT_SECRET) };
    },
    editAuthor: async (_root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
  },
  Subscription: {
    bookAdded:  {
        subscribe: () => pubSub.asyncIterator(['BOOK_ADDED'])
    }
  }
};

module.exports = resolvers;
