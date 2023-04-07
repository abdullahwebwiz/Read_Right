import Header from "../components/header/Header";
import HomeBody from "../components/homebody/homebody";
import GeneralLoader from "../components/generalloader/generalloader";
const HomePage = () => {
  if (Header && HomeBody) {
    return (
      <>
        <Header />
        <HomeBody />
      </>
    );
  } else {
    return (
      <>
        <GeneralLoader />
      </>
    );
  }
};
export default HomePage;
