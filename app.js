// / Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
  import { getDatabase,

ref,
push,
set,
onChildAdded,
remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA7pfK9gwUsdYG0V0P8GHlTtUGxCocZvVs",
    authDomain: "to-do-app-with-database-f63c6.firebaseapp.com",
    databaseURL: "https://to-do-app-with-database-f63c6-default-rtdb.firebaseio.com",
    projectId: "to-do-app-with-database-f63c6",
    storageBucket: "to-do-app-with-database-f63c6.appspot.com",
    messagingSenderId: "1084985263118",
    appId: "1:1084985263118:web:4a1a738d5cbb82876aa85f",
    measurementId: "G-4Y25TFXQP8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase();



  
  // =============================================================================================
// =============================================================================================
// ============================================================================================
var inp = document.getElementById('inp')

window.addTask = function () {
    var idref = push(ref(database,'Todos/')).key
    var obj = {
        input: inp.value,
        id : idref
    }
    var todoref = ref(database,`Todos/${idref}/`)
    set(todoref,obj)    
    inp.value = "";  
    window.location.href ="./index.html"

    }
    
    
    
    var ul = document.getElementById('ul')
    var li = document.getElementById('li')
    console.log(li);
    var arry = []   ;
    function nowValue (){
        var todoref = ref(database,'Todos/')
        onChildAdded(todoref,function (pushDataGet){
            
            var data = pushDataGet.val()
            arry.push(data)
            
            ul.innerHTML = "";
            for(var i  = 0; i < arry.length ; i++){
                ul.innerHTML += ` <li id ="li">${arry[i].input}
                <button class="del" onclick="clearVal('${arry[i].id}')">Delete</button>
                <button class="edit" onclick="editVal('${arry[i].input}','${arry[i].id}')">Edit</button>
               </li>`   
            }
        })
        window.editVal = function (value ,id) {   
            inp.value = value  
            remove(ref(database,`Todos/${id}`))
            // ul.innerHTML = ""
            
        }
        window.clearVal = function(id,This) {
            remove(ref(database,`Todos/${id}`))
            // ul.innerHTML = ""
            window.location.href ="./index.html"
            // location.reload()
            
        }
        window.delAll = function (){
            remove(ref(database,"Todos"))
        ul.innerHTML = " "            
            
            window.location.href ="./index.html"
        }
    }
    nowValue()