import React from 'react'
import Map, {Marker,Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Room,Star} from '@mui/icons-material';
import "./App.css"
import axios from 'axios'
import {format} from 'timeago.js'
import Registration from './components/register.jsx';
import Login from './components/login.jsx';

// axios is used to set all the pins fetch data 

function App() {
   
  const myStorage = window.localStorage;
  const [username,setUsername] = React.useState(myStorage.getItem("user"));
  const [place,setPlace] = React.useState({
    lat:0,long:0
  });
  
  const [titles,setTitles] = React.useState(null);
  const [desc,setDesc] = React.useState(null);
  const [rating,setRating] = React.useState(null);

  const [open,setOpen] = React.useState(false);
   
  const  [pin,setPin] = React.useState([])
  const [showRegister, setShowRegister] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  
  const [viewState, setViewState] = React.useState({
    latitude: 37.7517,
    longitude: -5.4376,
    zoom: 2
  });

  const [showPopup, setShowPopup] = React.useState(true);
  const [currentplace, setCurrentplace] = React.useState(null);
  const [currentlong, setCurrentlong] = React.useState(null);

  async function fetchpin(){
   try{ 
    const ds = await axios(
    {
      method:'get',
      url:'/pin/getLocation'
    })
    console.log(ds.data[0].about);
    setPin(ds.data[0].about);
  }
   catch(err)
   {
     throw(err);
   }

  }

  // fetchpin();

  React.useEffect(()=>{fetchpin();},[])
   
  // post method 

  

  const handlepointer = (lat,long)=>{
    setCurrentplace(lat); setCurrentlong(long);
    setViewState({...viewState,latitude:lat,longitude:long});
    // view state is generaly is the middle location of a screen
    
  }

  const handleLogout = () => {
    setUsername(null);
    myStorage.removeItem("user");
  };  

  const handleAddClick = async(e)=>{
    console.log(e.lngLat);
    
     var lati = e.lngLat.lat; var longi = e.lngLat.lng;
     console.log(longi);
     setPlace({lat:lati,long:longi});
     console.log(place);
     setOpen(true);
      
  }

  const handleSubmission=async(e)=>
  {    e.preventDefault();
       const pin_created ={
        name:username,
        title:titles,
        desc:desc,
        rating:rating,
        lat:place.lat,
        long:place.long
       };
       try{
       const callcreation =  await axios.post('/pin/location',pin_created);
       console.log(callcreation);
       setPin([...pin,callcreation.data])
       setOpen(false);
       const k = await fetchpin();
      }
       catch(err)
       {
         console.log(err);
       }
  }
  
  
  return (

    <div className="App" style={{ height: "100vh", width: "100%" }}>
      <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      onDblClick={handleAddClick}
      transitionDuration="200"
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      mapboxAccessToken='pk.eyJ1Ijoic3BhdGVsMjEiLCJhIjoiY2xmOGxpNml2MDZicjNycGNmYm9tbTF5diJ9.gfeWOZFd5XiTcTJKkjccIg'
      
      >

       


  {pin.map((p) => {
  if (isNaN(p.lat) || isNaN(p.long)) {
    console.log('Invalid coordinates for pin');
    return null;
  }

  return (
    <>
      <Marker
        longitude={p.long}
        latitude={p.lat}
        offsetLeft={-viewState.zoom * 6}
        offsetTop={-viewState.zoom * 12}
        anchor="bottom"
        color='red'
      >
        <Room
          style={{
            fontSize: viewState.zoom * 12,
            color: username === p.name ? 'tomato' : 'slateblue',
            cursor: 'pointer'
            
          }}
          onClick={() => {
            handlepointer( p.lat, p.long);
          }}
        />
      </Marker>
      {p.lat === currentplace && p.long===currentlong && (
        <Popup
          longitude={p.long}
          latitude={p.lat}
          anchor="left"
          closeButton={true}
          closeOnClick={false}
          // onClose={()=>{setCurrentplace(null);}}
        >
          <div className="card">
            <label>Place</label>
            <h4 className="place">{p.title}</h4>
            <label>Review</label>
            <p className="desc">{p.desc}</p>
            <label>Rating</label>
            <div className="stars">
              {Array(p.rating).fill(<Star className="star" />)}
            </div>
            <label>Information</label>
            <span className="username">
              Created by <b>{p.name}</b>
            </span>
            <span className="date">{format(p.createdAt)}</span>
          </div>
        </Popup>
      )}
    </>
  );
})}
      

    {/* now we have to create a popup for when we click double on map  rating desc title*/}

     { username !== null && open &&(<>
        <Popup 
        longitude={place.long} latitude={place.lat}
        anchor="left"
        closeButton={true}
        closeOnClick={false}
        onClose={()=>{setOpen(false);}}
        >
        <div>

          <form onSubmit={handleSubmission}>
            <label for="">Title</label>
            <input placeholder='enter a title' onChange={(e)=>{setTitles(e.target.value)}}/>
            <label for="">Description</label>
            <textarea  placeholder='say something about this place' onChange={(e)=>{setDesc(e.target.value)}}/>
            <label for="">Rating</label>
            <select className='options' onChange={(e)=>{setRating(e.target.value)}}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option></select>
            <br/>
            <button type='submit'  className="submitButton">ADD PIN</button>
          </form>

        </div>
        </Popup></>)
      
    } 
    
     {/* {username&&<button className='button logout'>Logout</button>}
     {!username &&
     <div className="buttons">
     <button className='button register'
     onClick={()=>{setShowRegister(true);}}
     >Register</button>
     <button className='button login' onClick={()=>{setShowLogin(true);}}>Login</button>
     </div>} */}
     
     {username !==null ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
    
     {showRegister && <Registration setShowRegister={setShowRegister} />}
     {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setUsername={setUsername}
            myStorage={myStorage}
          />
        )}
    </Map>

   
    </div>
    
  );
}

export default App;
