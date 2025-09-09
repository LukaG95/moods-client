import { api } from "./lib/api"
import { useAuth } from "@/context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  function fetchDetails() {
  api
    .request({
      url: "/api/auth/login",
      method: "POST",
      data: {
        email: "blablaaada@gmail.com",
        password: "22222222",
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

  function display(){
    if (loading) return 'loading';
    if (user) return `Logged in as: ${user.username}`
    return 'Not logged in'
  }

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <div>{display()}</div>
      <button onClick={()=> {fetchDetails()}}>LOGIN</button>
    </div>
  )
}

export default App