// Instance the tour
var tourduration = 10000;
var tour = new Tour({
  storage:false,
  steps: [
  {
    element: "",
    orphan: true,
    title: "Welcome",
    content: "Welcome to the Diplomacy Explorer Tour.  You will see some features of the application and learn a little about Diplomacy along the way.",
    duration: tourduration,
    onShow: function (tour) {map.panTo([10,10]);map.setZoom(1);$("#mapKeybutton").trigger('click');}
    //backdrop:true
  },
  {
    element: "#business",
    title: "Menu",
    content: "This the main menu.  It is split into five themes of diplomacy.",
    duration: tourduration,
    //onStart: function(tour) {$("#businessDrop").trigger('click');},
    onShown: function (tour) {}
  },
  {
    element: "#business",
    title: "Issues",
    content: "Each of these themes have a number of issues associated to them.",
    duration: tourduration,
    //onStart: function(tour) {$("#businessDrop").trigger('click');},
    onShown: function (tour) {$("#business").trigger('click');}
  },
  {
    element: "#business",
    title: "For example.",
    content: "For example, diplomacy can be a tool for building businesses through issuing visas and supporting tourism.",
    duration: tourduration,
    //onStart: function(tour) {$("#businessDrop").trigger('click');},
    onShown: function (tour) {$("#business").trigger('click');}
  },
  {
    element: "#mapKey",
    title: "",
    content: "You can read about the issue at the top.  Below are a number a maps that visually represent the issue.",
    duration: tourduration,
    //onStart: function(tour) {$("#businessDrop").trigger('click');},
    onShown: function (tour) {$("[name=VisasAndTourism_Key]").trigger('click');}
  },
  {
    element: "",
    title: "",
    orphan: true,
    content: "You will notice a lot has changed on the map.  Let's explore each part.",
    duration: tourduration,
    //onStart: function(tour) {$("#businessDrop").trigger('click');},
    onShown: function (tour) {} 
    //onShown: function (tour) {map.panTo([39,-37.698]);map.setZoom(6)} 
  },
  {
    element: ".legend",
    title: "",
    content: "The colors have changed on the countries.  Keep an eye on the legend to understand what they are representing.",
    duration: tourduration,
    //onStart: function(tour) {$("#businessDrop").trigger('click');},
    onShown: function (tour) {} 
    //onShown: function (tour) {map.panTo([39,-37.698]);map.setZoom(6)} 
  },
  {
    element: "",
    title: "",
    orphan: true,
    content: "Some maps have stories associated to them.  Click on the flag will open the story.",
    duration: tourduration,
    //onStart: function(tour) {$("#businessDrop").trigger('click');},
    onShown: function (tour) {map.panTo([10,10]);map.setZoom(1);$(".leaflet-marker-icon").first().trigger('click');} 
    //onShown: function (tour) {map.panTo([39,-37.698]);map.setZoom(6)} 
  },
  {
    element: "",
    title: "",
    orphan: true,
    content: "Sometimes it is hard to see the smaller countries.  Zoom in with your mousewheel.",
    duration: tourduration,
    //onStart: function(tour) {$("#businessDrop").trigger('click');},
    onShown: function (tour) {map.panTo([30,30]);map.setZoom(5)} 
    //onShown: function (tour) {map.panTo([39,-37.698]);map.setZoom(6)} 
  },
  {
    element: ".timeSlider",
    title: "",
    placement: "left",
    content: "There are special features for layers that change over time. Slide the bar to see the number of visas issues for each year. ",
    duration: tourduration,
    //onStart: function(tour) {$("#businessDrop").trigger('click');},
    onShown: function (tour) {} 
    //onShown: function (tour) {map.panTo([39,-37.698]);map.setZoom(6)} 
  },
  {
    element: "",
    title: "",
    placement: "left",
    orphan: true,
    content: "Thank you for taking the tour.  Please click around and explore on your own.  The application will not be reset to start from the beginning.",
    duration: tourduration,
    //onStart: function(tour) {$("#businessDrop").trigger('click');},
    onShown: function (tour) {} 
    //onShown: function (tour) {map.panTo([39,-37.698]);map.setZoom(6)} 
  },
  {
    element: "",
    title: "",
    placement: "left",
    orphan: true,
    content: "Closing",
    duration: tourduration,
    //onStart: function(tour) {$("#businessDrop").trigger('click');},
    onShown: function (tour) {tour.end();map.panTo([10,10]);map.setZoom(1);} 
    //onShown: function (tour) {map.panTo([39,-37.698]);map.setZoom(6)} 
  }
  
]});

