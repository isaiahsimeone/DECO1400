/*
 * New Zealand Adventures
 * Author: s4434012
 */

/* Toggle dropdown menu */
function dropdown() {
    window.dropdown_visible = !window.dropdown_visible
    var dropdown_menu = document.getElementById("dropdown_menu");

    if (window.dropdown_visible)
        dropdown_menu.style.visibility = "visible";
    else
        dropdown_menu.style.visibility = "hidden";

}

/*
 * Listen for any click on the page. If dropdown menu is visible, make it hidden (unless
 * the click is targetted on the dropdown activator)
 */
window.onclick = function(event) {
    if (window.dropdown_visible && event.path[0].getAttribute("onclick") !== "dropdown()")  {
        document.getElementById("dropdown_menu").style.visibility = "hidden";
        window.dropdown_visible = false;
    }
}

/* User resizes page. Close dropdown menu (if open) */
window.onresize = function(event) {
    if (window.dropdown_visible)
        dropdown()
}

/* User scrolled. Close dropdown menu (if open) */
window.onscroll = function(event) {
    if (window.dropdown_visible)
        dropdown();
}

/* Set globals */
window.onload = function(event) {
    window.dropdown_visible = false;
}

/* Post a new review on review page */
// Not saved serverside or in cookie, no xss risk
function doPost() {
    var review_container = document.getElementById("review_content");
    // Get review inputs
    var reviewer_name = document.getElementById("reviewer_name").value;
    var review_content = document.getElementById("review_content_text").value;

    // Don't allow excessively long input
    if (reviewer_name.length > 10) {
        alert("Name too long!");
        return ;
    }
    if (review_content.length > 100) {
        alert("Message too long!")
        return ;
    }
            
    // Get formatted date
    var date = new Date(Date.now());
    var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var date_str = weekdays[date.getDay()] + " " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

    // Construct new review
    var review_wrapper = document.createElement("div");
    var review_meta = document.createElement("div");
    var review_meta_name = document.createElement("h3");
    var review_meta_date = document.createElement("h5");

    review_wrapper.classList += "review_wrapper";
    review_meta.classList += "review_meta";

    // Apped to review meta header tags
    review_meta_name.appendChild(document.createTextNode(reviewer_name));
    review_meta_date.appendChild(document.createTextNode(date_str));

    // Append metadata to review meta
    review_meta.appendChild(review_meta_name);
    review_meta.appendChild(review_meta_date);
    
    // Append to review div
    review_wrapper.appendChild(review_meta);
    review_wrapper.appendChild(document.createTextNode(review_content));

    // Append review to page
    review_container.appendChild(review_wrapper);
}