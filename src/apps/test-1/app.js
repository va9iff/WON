export default {
    name: "test-1",
    startX: 100,
    startY: 100,
    // $WON means the current url that WON is opened
    home: "$WON/src/apps/test-1/index.html", //we don't have to have the real page in our repo.
    icon: "$WON/src/apps/test-1/icon.svg",
    desktopIcon: true,
    onClose: function(){
        for(let win of this.windows){
            win.close()
        }
    }
    
    // icon: "./img/icon"
}