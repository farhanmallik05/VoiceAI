(function () {


    // userData & script resolution

    const script = document.currentScript || 
                   document.querySelector('script[data-user-id]') || 
                   document.querySelector('script[src*="assistant.js"]');

    const userId = script?.dataset?.userId || script?.getAttribute('data-user-id');

    // Base URL for static assets (CSS, icons) derived from the script source
    let assetBaseUrl;
    try {
        if (script && script.src) {
            assetBaseUrl = new URL(script.src, window.location.href).origin;
        } else {
            assetBaseUrl = window.location.origin;
        }
    } catch (error) {
        console.warn("[VoiceAI] Asset resolution fallback:", error);
        assetBaseUrl = window.location.origin;
    }

    // Base URL for the API server (prioritize data-server-url, fallback appropriately)
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const defaultServerUrl = isLocalhost ? "http://localhost:8000" : "https://voiceai-ygsy.onrender.com";
    const serverUrl = script?.dataset?.serverUrl || 
                      script?.getAttribute('data-server-url') || 
                      defaultServerUrl;

    const theme = "dark"

    let assistantConfig = null


    // load CSS

    const link = document.createElement("link")

    link.rel = "stylesheet"

    link.href = `${assetBaseUrl}/assistant.css`

    document.head.appendChild(link)


    // Create PopUp

    const popup = document.createElement("div")

    popup.className = `voice-popup theme-${theme}`

    popup.innerHTML = `
    <div class="voice-overlay"></div>

    <div class="voice-content">

       <div class="voice-top">
            <div class="voice-orb-wrap">

                <div class="voice-orb-glow"></div>

                <div class="voice-orb"></div>

            </div>

            <h2 class="voice-title">
                Hello! I'm Voice AI
            </h2>

            <p class="voice-sub">
                Your smart voice assistant.
                <br />
                Ask anything about your website.
            </p>


            <div class="voice-status">
                Tap button to Speak
            </div>

            <div class="voice-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <!-- User Text -->
            <div class="voice-user-text">
            </div>

            <!-- AI Text -->
            <div class="voice-ai-text">
            </div>
  
        </div>


        <div class="voice-bottom">
            
            <button class="voice-mic">

               <img 
               src="${assetBaseUrl}/mic.svg"
               alt="mic"
               class="voice-mic-icon"/>
            </button>
        </div>
    </div>
    
    `;

    document.body.appendChild(popup);

    // floating Button

    const button = document.createElement("button")

    button.className = `voice-btn theme-${theme}`

    button.innerHTML = `
    <img 
    src="${assetBaseUrl}/logo.png"
    alt="logo"
    />`;
    document.body.appendChild(button)




    // toggle popup

    let open = false

    button.onclick = () => {
        open = !open;
        popup.style.display = open ? "flex" : "none";
    }


    // load Assistant

    const loadAssistant = async () => {
        if (!userId) {
            console.warn("[VoiceAI] Missing userId in script tag.");
            return;
        }
        try {
            const res = await fetch(`${serverUrl}/api/assistant/config/${userId}`)

            const data = await res.json()

            if (data && data.user) {
                assistantConfig = data.user
                applyConfig()
            } else if (data && data.message) {
                console.warn("[VoiceAI] Config notice:", data.message)
            }

        } catch (error) {
            console.error(
                "[VoiceAI] Assistant Load Error:",
                error
            );
        }
    }


    const applyConfig = () => {
        if (!assistantConfig) return;

        popup.className = `voice-popup theme-${assistantConfig.theme}`

        button.className = `voice-btn theme-${assistantConfig.theme}`

        const title = popup.querySelector(".voice-title")

        title.innerHTML = `Hello! I'm ${assistantConfig.assistantName}`;

        const subTitle = popup.querySelector(".voice-sub")
        subTitle.innerHTML = `
    Welcome to
    ${assistantConfig.businessName}.
    <br />
    Ask anything about your website.
  `;


    }

    loadAssistant()


    // Element


    const status =
        popup.querySelector(
            ".voice-status"
        );

    const wave =
        popup.querySelector(
            ".voice-wave"
        );

    const userText =
        popup.querySelector(
            ".voice-user-text"
        );

    const aiText =
        popup.querySelector(
            ".voice-ai-text"
        );

    const mic =
        popup.querySelector(
            ".voice-mic"
        );



    // text-speech

    const speak = (text) => {
        window.speechSynthesis.cancel();

        // Show AI response
        aiText.innerText =
            text;

        status.innerText =
            "AI Speaking...";

        const speech = new SpeechSynthesisUtterance(text)

        speech.lang =
            "hi-IN";

        speech.rate = 1;

        speech.pitch = 1;

        speech.volume = 1;

        // Voice end
        speech.onend = () => {

            status.innerText =
                "Tap button to Speak";

            wave.style.opacity =
                "0";
        };

        // Start speaking
        window.speechSynthesis.speak(
            speech
        );
    }


    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition


    if(SpeechRecognition){

        const recognition = new SpeechRecognition();

        recognition.lang =
      "en-US";

    recognition.continuous =
      false;

    recognition.interimResults =
      false;


      mic.onclick=()=>{
        wave.style.opacity =
        "1";

      status.innerText =
        "Listening...";

      userText.innerText =
        "";

      aiText.innerText =
        "";

      recognition.start();
      }


      recognition.onresult = (e)=>{
        const text = e.results[0][0].transcript

        userText.innerText = "You: " + text;

        recognition.stop();


        setTimeout( async () => {
            try {
                status.innerText = "Thinking...";
                

                const res = await fetch(`${serverUrl}/api/assistant/ask` , {
                    method:"POST",
                    headers:{
                        "Content-Type":
                      "application/json",
                    } ,
                    body:JSON.stringify({
                        message:text,
                        userId
                    })
                })

                const data = await res.json()
                console.log("[VoiceAI] Ask response:", data)

                if(data.success){

                    if(data.action === "navigate"){
                        speak(data.response)

                        setTimeout(()=>{
                            window.location.href = data.path

                        },1500)

                    }else{
                        speak(data.aiResponse)
                    }

                }else{
                    speak(data.message || "Response Error please Check your plan")

                }



            } catch (error) {
                console.error("[VoiceAI] Ask Error:", error)
                speak("AI Server Error")
                
            }
        },600)
      };

      recognition.onerror = ()=>{
        status.innerText =
          "Tap button to Speak";

        wave.style.opacity =
          "0";
      }


    }
    else{
        status.innerText =
      "Speech Recognition not supported";
    }


})();
