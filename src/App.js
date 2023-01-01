import "./App.css";
import AnimatedRoutes from "./components/AnimatedRoutes";
// import { RecipeContext } from "./Context";
// import { useEffect } from "react";
import NavBar from "./components/navigationBar/Index";
// import axios from "axios";
import ContextProvider from "./statesStorage/ContextProvider";

function App() {
  // const [isLogin, setIsLogin] = useState(false);
  // const [signUp, setSignUp] = useState({
  //   name: "",
  //   password: "",
  //   verifyPassword: "",
  // });
  // const [signUpErr, setSignUpErr] = useState({
  //   name: true,
  //   password: true,
  //   verifyPassword: true,
  // });
  // const [login, setLogin] = useState({ name: "", password: "" });
  // const [loginErr, setLoginErr] = useState({ name: true, password: true });
  // const [users, setUsers] = useState([]);
  // const [usersFecth, setUsersFetch] = useState(true);
  // const [currentUser, setCurrentUser] = useState(null)

  // useEffect(() => {
  //   const getUsers = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4600/users");
  //       setUsers(response.data.map((user) => user));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getUsers();
  // }, [usersFecth]);

  // const data = {
  //   isLogin,
  //   setIsLogin,
  //   signUp,
  //   setSignUp,
  //   login,
  //   setLogin,
  //   signUpErr,
  //   setSignUpErr,
  //   loginErr,
  //   setLoginErr,
  //   users,
  //   usersFecth,
  //   setUsersFetch,
  //   currentUser,
  //   setCurrentUser
  // };
  /* 1-Her sayfanın kendine ayrı css'i var
     2-useContext kullanmayı bir youtube videosu refereans alınarak yapılmıştır başlangıç kısmı src içerisndeki Context.js kısmıdır
     3-framer motion kütüphanesi indirilmiştir sebebi sayfalar arasında animasyonlu geçişlerin olması için ve elementlere çeşitle animasyonlar vermek içindir
     4-App.js ' de sabit kalması için sadece navbar duruyor onun haricindeki routerları yani sayfaları <AnimatedRoutes /> adlı componentde topladım
     sonra onu App.js 'e import ettim 
     5-useContext kullanırken bütün stateleri App.js de belirleyip diğer komponentlere ihtiyaç olanları çektim. Context.js dosyasında 
     adını belirlemiş olduğumuz conteximiz RecipeContext'dir bu yüzden ana div yerine <RecipeContext tag ile sarmallayarak elementleri arasında tuttuk ki bütün verilerimizi
     bütün componentlere uygulayabilelim....
     6-Bütün statelerimizi App.js den aldık sonra onları bir değişken(data) içerisinde topladık bunu bizim statelerimizin depo edildiği bir data
     dosyası olarak düşünebiliriz. sonra bu sarmalladığımız Recipe.Context ana divine value olarak verdik. Bu arada buradaki provider özel bir keyword'dür

  */
  return (
    // <RecipeContext.Provider value={data}>
    //   <NNavBaravBar />
    //   <AnimatedRoutes />
    // </RecipeContext.Provider>
    <ContextProvider>
      <NavBar />
      <AnimatedRoutes />
    </ContextProvider>
  );
}

export default App;
