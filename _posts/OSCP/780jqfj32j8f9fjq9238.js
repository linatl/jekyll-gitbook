function runthething() {
var msdelay = 1000;
    function clickButton(msdelay) {
        setTimeout(function() {
            var button = document.getElementById("troop_confirm_submit");
            if (button) {
                button.click();
            } else {
                alert("Button not found with name: " + buttonName);
            }
        }, msdelay)
    };
clickButton("troop_confirm_submit", msdelay);
}();
