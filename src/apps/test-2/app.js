export default {
    name: "test-2",
    startX: 100,
    startY: 100,
    // $WON means the current url that WON is opened
    home: "$WON/src/apps/test-2/index.html", //we don't have to have the real page in our repo.
    icon: "$WON/src/apps/test-2/icon.svg",
    desktopIcon: true,
    onClose: function(){
        for(let win of this.windows){
            win.close()
        }
        let _testwins = [...this.testwins]
        this.testwins = []
        for(let win of _testwins){
            win.close()
        }

    },
    testwins: [],
    
    // icon: "./img/icon"
}