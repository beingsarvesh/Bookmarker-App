// listen for form submit
document.getElementById("submit").addEventListener("click",saveBookmark);
// $("#submit").click(function(){
// 	saveBookmark();
// })
//( ask here about how lower function can access this variables)

function saveBookmark(){
     //console.log("It works"); // this flashes in console without preventDefault()
     //get Form Values
     var siteName = document.getElementById("siteName").value;
     var siteURL = document.getElementById("siteURL").value;
   
     if(!validateForm(siteName,siteURL)){
     	return false;
     }

     var bookmark = {
     	              name : siteName,
     	              url: siteURL
     	            }


   /* // local storage test
    LocalStorage.setItem("test","Hello World");
    console.log(LocalStorage.getItem("test"));   local storage always stores string
    LocalStorage.removeItem("test");
    console.log(LocalStorage.getItem("test"));
   */
    //test if bookmarks is null
   if(localStorage.getItem("bookmarks") === null) {
   	// init array
   	var bookmarks = [];
   	// add to array
   	bookmarks.push(bookmark);
   	// set to localstorage
   	localStorage.setItem("bookmarks",JSON.stringify(bookmarks)); //stringify converts JSON to string
   	//console.log(bookmarks);
   }
   else{
   	// get bookmarks from local storage if initially it existed
   	var bookmarks =JSON.parse(localStorage.getItem("bookmarks")); // parse converts a string to a JSON
    // add bookmark to array
    bookmarks.push(bookmark);
    // re-set back to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
   }
     // clear the form
     document.getElementById("myForm").reset();
     // re-fetch bookmarks
       fetchBookmarks();
                    
     e.preventDefault();  // to prevent default form from submitting
 }
   // delete bookmark

   function deleteBookmark(url){
         console.log(url); //this wasnt working as expected
         var bookmarks =JSON.parse(localStorage.getItem("bookmarks"));
         // console.log(bookmarks);
         //loop through bookmarks
         for(var i =0; i<bookmarks.length; i++){
         	if(bookmarks[i].url === url){
         		//remove array element
         		bookmarks.splice(i,1); // remove a single element from index i
         }
       }
       //reset bookmarks in local storage
       localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
       
       // re-fetch bookmarks
       fetchBookmarks();
   }
 //fetch bookmarks
 function fetchBookmarks(){
    // get bookmarks from local storage 
   	var bookmarks =JSON.parse(localStorage.getItem("bookmarks")); 
   	//console.log(bookmarks);
   	// get output id
   	var bookmarksResults = document.getElementById("bookmarksResults");
   	if(bookmarks==null)
   		return;
   	// build output
   	bookmarksResults.innerHTML = "";
   	for(var i = 0; i<bookmarks.length; i++){
   		var name = bookmarks[i].name;
   		var url = bookmarks[i].url;


   		bookmarksResults.innerHTML += "<div class='well'>" +
   		                              "<h3>" + name + "  "+
   		                              "<a class='btn btn-default' target= '_blank' href= "+url+" >Visit</a>" + "  " +
   		                              "<a onclick='deleteBookmark(\""+url+"\")' class='btn btn-danger' href= ''>Delete</a>" +
   		                              "</h3>"+ 
   		                              "</div>";
   	}
 }

 // validate form function

function validateForm(siteName,siteURL){
	        // for validation of an empty form            
    if(!siteName || !siteURL){
    	alert("Please fill the form");
    	return false; //to ask  why we are returning false here 
    } 	   

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
       alert("please use a valid URL");
       return false;
    }
    return true;
}