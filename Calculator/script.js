window.onload = function () {
    let equals = document.getElementById("calculate");
    let output = document.getElementById("output");
    let animation = document.getElementsByClassName("animation")[0];

    output.innerText = "";
    animation.innerText = "";

    let sin = false;
    let cos = false;
    let tan = false;
    let ln = false;
    let power = false;
    let sqrt = false;
    let exp = "";
    let answer = "";

    equals.addEventListener("click", function(){
        if(sqrt || sin || cos || tan|| ln){
            exp += ")";
        }

        console.log(exp, answer);
        try{
            exp = eval(exp);
            output.innerText = exp;
            answer = exp.toString();
            console.log(exp, answer);
            if(answer=="NaN"){
                output.innerText = "Invalid input";
            }
        }
        catch{
            alert("Invalid input!");
        }

        //resetting
        sqrt = cos = tan = sin = ln = power = false; 
        console.log(exp);
        //clear exp ? 
    });

    //buttons ke event listeners
    let buttons = document.getElementsByClassName("col");

    for (let i = 0; i<buttons.length; i++) {

        buttons[i].addEventListener("click", function (){
            // console.log("click")
            let value = buttons[i].innerText;
            if(value == "AC"){
                output.innerText = "";
                sin = cos = tan = ln = sqrt = power = false;
                exp = "";
                answer = "";
                animation.innerText = "";
            }

            else if(value=="<--"){
                output.innerText = output.innerText.slice(0, -1);
                answer = answer.slice(0, -1);
                exp = answer;
            }

            else {
                if(answer.length<18 && value!="="){
                    //corner case to handle if user tries to put multiple zeroes at the beginning
                    if((answer=="" || answer=="0") && (value=="0" || value=="00")){
                        answer="0";
                    }
                    else if((answer=="" || answer=="0") && (value!="0" || value!="00")){
                        answer = value;
                        // console.log(answer)
                    }
                    else {
                        answer += value;
                    }
                    animation.innerText = value; 
                    animation.classList.add("animate");

                    setTimeout(() => {
                        animation.innerText = ""; 
                        //removing the animation after 1 second
                        animation.classList.remove("animate");
                        //clearing the animation box/ div
                        
                    }, 1000);
                    output.innerText = answer;
                }

                if(value == "sin"){
                    exp += "Math.sin(";
                    sin = true;
                }

                else if(value == "cos"){
                    exp += "Math.cos(";
                    cos = true;
                }

                else if(value == "tan"){
                    exp += "Math.tan(";
                    tan = true;
                }

                else if(value == "ln"){
                    exp += "Math.log(";
                    ln = true;
                }
                else if(value =="^"){
                    power = true;
                    exp += "**";
                }

                else if(value =="^"){
                    power = true;
                    exp += "**";
                }

                else if(value =="sqrt"){
                    exp += "Math.sqrt("
                    sqrt = true;
                }

                else{
                    if(value!="=")
                        exp += value;
                }
            }

        });
    }

};