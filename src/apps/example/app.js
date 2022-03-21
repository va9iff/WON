export default {
    name: "example",
    startX: 100,
    startY: 100,
    // $WON means the current url that WON is opened
    home: "$WON/src/apps/example/index.html", //we don't have to have the real page in our repo.
    icon: "$WON/src/apps/example/example_icon.png",
    desktopIcon: true,


    // we can just to them with urls. here is on the repo tho.

    onOpen: function(window){},
    onOpenWith: function(window, files){},
    
    // icon: "./img/icon"
}