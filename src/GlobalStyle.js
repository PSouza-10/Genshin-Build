import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        outline: none;
        color: var(--primary);
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type=number] {
          -moz-appearance: textfield;
        }
       
    }

    html, body, #root {
        max-height: 100vh;
        max-width: 100vw;
   
        width: 100%;
        height: 100%;
        background-color: var(--bgPrimary);
    }

    h1 {
        font-weight: 500;
        font-size: 22px;
    }

    ul {
        list-style: none;
        
    }
    a{
        text-decoration:none;
        color: inherit;
        &:hover{
            text-decoration: underline;
        }
    }
    button {
        border: none;
        
    }
    :root {
        --bgPrimary: #222;
        --bgSecondary: #333;
        --icon: #fff;
        --primary: #f4d8a8;
        --detail: #7A7A7A;
        --outline: #2F3336;
        --positive: #00C06B;
        --negative: #f92042;
        --hover: #2C8ED6;
        --stars1: #a1a09f;
        --stars2: #79a368;
        --stars3: #5380a7;
        --stars4: #8e78ab;
        --stars5: #c2883a;
    }


`
