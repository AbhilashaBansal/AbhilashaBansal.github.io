window.onload = start(); 

function start() {
    let equals = document.getElementById("calculate");
    let output = document.getElementById("output");
    let animation = document.getElementsByClassName("animation")[0];

    output.innerText = "";
    animation.innerText = "";

    let sin = false;
    let cos = false;
    let tan = false;
    let ln = false;
    let sqrt = false;

    //variable string that we will send for evaluation, to the eval fn 
    let exp = "";
    //the display_text that will be displayed on screen, upon evaluation 
    let display_text = "";

    equals.addEventListener("click", function(){
        if(sqrt){
            exp += ")";
        }
        if(sin){
            exp += ")";
        }
        if(cos){
            exp += ")";
        }
        if(tan){
            exp += ")";
        }
        if(ln){
            exp += ")";
        }
       //replacing all instances of sin, cos etc with correct Math fns 
        exp = exp.replace(/sin/g, "Math.sin(");
        exp = exp.replace(/cos/g, "Math.cos(");
        exp = exp.replace(/tan/g, "Math.tan(");
        exp = exp.replace(/ln/g, "Math.log(");
        exp = exp.replace(/sqrt/g, "Math.sqrt(");


        console.log("Expression:", exp, "Displayed output:", display_text);

        try{
            exp = eval(exp);
            display_text = exp.toString();

            console.log("Expression:", exp, "Evaluated display_text:", display_text);
            if(display_text == "NaN"){
                output.innerText = "Invalid input";
            }
            else{
                output.innerText = display_text;
            }
        }
        catch{
            alert("Invalid input!");
        }

        //resetting
        sqrt = cos = tan = sin = ln = false; 
        // console.log(exp); 
    });

    //adding event listeners 

    //FOR NUMBERS & PLAIN TEXT (operators + brackets)
    let numbers = document.getElementsByClassName("no");
    for(let i=0; i<numbers.length; i++){
        numbers[i].addEventListener("click", function(e){
            let value = numbers[i].innerText;
            if(display_text.length<22){
                //corner case to handle if user tries to put multiple zeroes at the beginning
                if((display_text=="" || display_text=="0") && (value=="0" || value=="00")){
                    display_text="0";
                }
                else if((display_text=="" || display_text=="0") && (value!="0" || value!="00")){
                    display_text = value;
                }
                else {
                    display_text += value;
                }
                animation.innerText = value; 
                animation.classList.add("animate");

                setTimeout(() => {
                    animation.innerText = ""; 
                    //removing the animation after 1 second
                    animation.classList.remove("animate");
                    //clearing the animation box/ div
                }, 1000);
                output.innerText = display_text;
            }

            if(value=="^"){
                value = "**";
            }
            exp += value;
        });
    }
        
    //FOR AC
    document.getElementsByClassName("ac")[0].addEventListener("click", function(e){
        output.innerText = "";
        exp = "";
        display_text = "";
        animation.innerText = "";
        sin = cos = tan = ln = sqrt = power = false;
    });
    
    //FOR <-- (BACKSPACE)
    document.getElementsByClassName("backspace")[0].addEventListener("click", function(e){
        output.innerText = output.innerText.slice(0, -1);

        display_text = display_text.slice(0, -1);
        exp = display_text;
    });

    //FOR OTHERS (sqrt, ln, sin, cos, tan)
    let fns = document.getElementsByClassName("fn");
    for(let j=0; j<fns.length; j++){
        fns[j].addEventListener("click", function(e){
            let value = fns[j].innerText;
            if(display_text.length <20) {
                
                if(display_text=="" || display_text=="0"){
                    display_text = value;
                }
                else{
                    display_text += value;
                }
                animation.innerText = value; 
                animation.classList.add("animate");

                setTimeout(() => {
                    animation.innerText = ""; 
                    //removing the animation after 1 second
                    animation.classList.remove("animate");
                    //clearing the animation box/ div
                }, 1000);
                output.innerText = display_text;
            }

            if(value == "sin"){
                sin = true;
            }

            else if(value == "cos"){
                cos = true;
            }

            else if(value == "tan"){
                tan = true;
            }

            else if(value == "ln"){
                ln = true;
            }
            else if(value =="sqrt"){
                sqrt = true;
            }
            exp += value;
        });
    }
    
}