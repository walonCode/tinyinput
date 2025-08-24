import { createInterface } from "readline/promises";
import { Opt } from "./type";

export async function input(question:string, opt:Opt):Promise<string | number>{
    const r1 = createInterface({
        input:process.stdin,
        output:process.stdout
    })

    let value:string
    let parse:string | number

    while(true){
        value = await r1.question(question)
        r1.close()

        value = value.trim()

        if(opt === "int"){
            parse = parseInt(value, 10)
            if(!Number.isNaN(parse))break
            console.log("Please enter a valid integer")
        }else if (opt === "float"){
            parse = parseFloat(value)
            if(!Number.isNaN(value))break;
            console.log("Please enter a valid number")
        }else {
            if(value.length > 0){
                parse = value
                break;
            }
            console.log("Please enter a non-empty string.")
        }
    }

    return parse
}


