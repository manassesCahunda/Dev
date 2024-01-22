let inputs = document.getElementsByTagName("input");

let url = window.location.pathname;

let Input = document.querySelector("input[type='password']");

var toast = document.createElement("div");

var close = document.createElement("button");

var img = document.createElement("div");

toast.innerHTML = " Palavra-passe criptografada ";
toast.style.position = "fixed";
toast.style.bottom = "10px";
toast.style.right = "10px";
toast.style.backgroundColor = "gray";
toast.style.color = "white";
toast.style.height = "30px";
toast.style.borderRadius = "5px";
toast.style.paddingTop = "10px";
toast.style.paddingRight = "10px";
toast.style.paddingLeft = "10px";
toast.style.border = "black solid 2px";



close.innerHTML = "x";
close.style.position = "fixed";
close.style.bottom = "40px";
close.style.right = "5px";
close.style.backgroundColor = "red";
close.style.color = "white";
close.style.borderRadius = "100px";


toast.appendChild(close);

close.addEventListener("click", () => {

  Input.value = "";

});


for (let input of inputs) {

  input.addEventListener("input",
    async () => {

      if (input.type === "password") {

        let password = new TextEncoder().encode(input.value);

        let salt = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).buffer;

        let iterations = 500000;

        let algo = "SHA-512";

        key = await window.crypto.subtle.importKey(

          "raw",

          password,

          "PBKDF2",

          false,

          ["deriveBits", "deriveKey"]

        );

        pbkdf2 = await window.crypto.subtle.deriveKey(

          { "name": "PBKDF2", "salt": salt, "iterations": iterations, "hash": algo },

          key,

          { "name": "AES-CBC", "length": 256 },

          true,

          ["encrypt", "decrypt"],

        );

        result = await window.crypto.subtle.exportKey(

          "raw",

          pbkdf2,

        );

        let hashCrypt = Array.from(new Uint8Array(result)).map(x => x.toString(16).padStart(2, "0")).join("");

        document.body.appendChild(toast);

        setTimeout(function () {

          input.value = "M@" + hashCrypt;

        }, 6000);


      }
    }

  )
}