import { useEffect } from "react";
import Home from "./Components/Home/Home";

function App() {
  useEffect(() => {
    // Inicializar productsData en localStorage si no existe
    if (!localStorage.getItem('productsData') || JSON.parse(localStorage.getItem('productsData')).length === 0) {
      const productsData = [
        {
          "id": 1,
          "name": "Resident evil 4",
          "img": "https://image.api.playstation.com/vulcan/ap/rnd/202207/2509/85p2Dwh5iDhUzRKe40QeNYh3.png",
          "price": 59.99,
          "quanty": 5
        },
        {
          "id": 2,
          "name": "Silent hill 2 Remake",
          "img": "https://image.api.playstation.com/vulcan/ap/rnd/202404/2513/cbb048cb3953c4316cb64d7cd30310707206f4f46e94a8d6.png",
          "price": 49.99,
          "quanty": 15
        },
        {
          "id": 3,
          "name": "Call of duty Black ops 6",
          "img": "https://image.api.playstation.com/vulcan/ap/rnd/202405/2921/29c42f9aec125fe3ad4d21c6021acbf25720f1d21f9fd9bb.png",
          "price": 19.99,
          "quanty": 30
        }
      ];
      localStorage.setItem('productsData', JSON.stringify(productsData));
    }

    // Inicializar userData en localStorage si no existe
    if (!localStorage.getItem('usersData')) {
      const usersData = [
        {
          "username": "admin",
          "password": "admin123",
          "role": "admin"
        },
        {
          "username": "user1",
          "password": "user123",
          "role": "user"
        }
      ];
      localStorage.setItem('usersData', JSON.stringify(usersData));
    }
  }, []); 

  return (
    <>
      <Home />
    </>
  );
}

export default App;
