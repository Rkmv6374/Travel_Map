import React from 'react'
import Map, {Marker,Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Room,Star} from '@mui/icons-material';
import "./App.css"
import axios from 'axios'
import {format} from 'timeago.js'


// axios is used to set all the pins fetch data 

function App() {

  const [username,setUsername] = React.useState("Aman_raj");
  const [place,setPlace] = React.useState({
    lat:0,long:0
  });
  
  const [titles,setTitles] = React.useState(null);
  const [desc,setDesc] = React.useState(null);
  const [rating,setRating] = React.useState(null);

  const [open,setOpen] = React.useState(false);
   
  const  [pin,setPin] = React.useState([])
  
  const [viewState, setViewState] = React.useState({
    latitude: 37.7517,
    longitude: -5.4376,
    zoom: 2
  });

  const [showPopup, setShowPopup] = React.useState(true);
  const [currentplace, setCurrentplace] = React.useState(null);

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

  

  const handlepointer = (id,lat,long)=>{
    setCurrentplace(lat);
    setViewState({...viewState,latitude:lat,longitude:long});
    // view state is generaly is the middle location of a screen
    
  }

  
  const handleAddClick = async(e)=>{

    // try{
    // const data = e.lnglat; 
    // console.log(data.lat);
    //  const lati = data.lat; const longi = data.lng;
    //  setPlace({lat:lati,long:longi});
    //  console.log(place);
    //  setOpen(true);}
    //  catch(err)
    //  {console.log(err);
    //  }
     
     
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
       setPin([...pin,callcreation.data])
       setOpen(false);
      }
       catch(err)
       {
         console.log(err);
       }
  }
  
  
  return (

    <div className="App">
      <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      onDblClick={handleAddClick}
      transitionDuration="200"
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      mapboxAccessToken='pk.eyJ1Ijoic3BhdGVsMjEiLCJhIjoiY2xmOGxpNml2MDZicjNycGNmYm9tbTF5diJ9.gfeWOZFd5XiTcTJKkjccIg'
      
      >

       {/* mark each and every pin of each person */}
{/*         
        {pin.map((p)=>(
         if (isNaN(p.lat) || isNaN(p.long)) {
           console.log('Invalid coordinates for pin');
           return null;
          }
       return (
      <>
      <Marker longitude={p.long} latitude={p.lat} 
        offsetLeft={-viewState.zoom*6}
        offsetTop={-viewState.zoom*12}
        anchor="bottom" color="red">

         <Room style={{fontSize:viewState.zoom*12 , color:username===p.name?"tomato":"slateblue",
                  cursor: "pointer",}}
         onClick={()=>{handlepointer(p.name,p.lat,p.long);}}
         

         />
        </Marker>
        {p.name===currentplace && 
        (<Popup longitude={p.long} latitude={p.lat}
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
                    Created by  <b>{p.name}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
      </Popup>)}

          </>
    
  );
))}
       */}


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
        color="red"
      >
        <Room
          style={{
            fontSize: viewState.zoom * 12,
            color: username === p.name ? 'tomato' : 'slateblue',
            cursor: 'pointer',
          }}
          onClick={() => {
            handlepointer(p.name, p.lat, p.long);
          }}
        />
      </Marker>
      {p.lat === currentplace && (
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

     { open &&(<>
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

    </Map>
    </div>
    
  );
}

export default App;
