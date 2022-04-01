const Header = ({ level, text }) => {
  const CustomH = `h${level}`;
  return (
    <div>
      <CustomH>{text}</CustomH>
    </div>
  );
};

export default Header;
