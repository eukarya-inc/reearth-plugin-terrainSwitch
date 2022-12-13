const html = `
<style>
  html, body {
   margin: 0;
   width:94px;
   height:56px;
  }
  .wrapper {
  }
  
  button {
    width:100%;
    height:56px;
    display:flex;
    align-items: center;
    padding: 12px;
    font-size: 14px;
    font-family: "Robot" ,san-serif;
    font-weight: 700;
    color: #00BEBE;
    border-radius: 4px;
    border: 1px solid;
  }

  button:active {
    border: 1px solid #F5F5F5;
    color: rgba(0, 0, 0, 0.25);
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  
  button svg {
    margin-right: 8px;
  }
</style>
<div class="wrapper">
  <button id="switch-button">
    <svg width="32px" height="32px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5886 22L3 14.0503C3.55142 13.4184 4.81969 12.4187 5.4814 10.9999C6.30853 9.22657 6.40481 8.49995 8 8.49995C10.1965 8.49995 9.6 13.4999 11.1 13.4999C12.6 13.4999 11.9048 5.79492 13.5 5.79492C15.0361 5.79492 14.7 9.70858 16.4114 7.75175C17.1945 6.85634 17.9475 9.70858 18.6565 9.70858C19.3654 9.70858 19.7266 0.999703 21.5 0.999756C23.1543 0.999805 24.0013 8.84466 26 10.4998C28.0678 12.2121 29.035 12.8884 30 14.0503L16.5886 22Z" stroke="currentColor" stroke-width="2"/>
    <path d="M3 20L16.5886 28L30 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
    地形
  </button>
</div>
<script>

document.getElementById("switch-button").addEventListener("click", (e)=>{
  parent.postMessage({ type: "terrain" }, "*");
})

//iframeがRe:Earth側からメッセージを受け取った時、内容がeに入る
addEventListener("message", e => {
  if (e.source !== parent) return;
  property = e.data.property;

  const uiColor = document.getElementById("switch-button");
  if(property.ui) {
    uiColor.style.color = property.ui.color;

  } else {
    uiColor.style.color = "#00BEBE";
  }
})



</script>
`;

reearth.on("message", (msg) => {
  if (msg.type == "terrain") {
    if (reearth.scene.property.terrain.terrain == true) {
      reearth.scene.overrideProperty({ terrain: { terrain: false } });
    } else {
      reearth.scene.overrideProperty({ terrain: { terrain: true } });
    }
  }
});

reearth.ui.show(html);

reearth.on("update", () => {
  reearth.ui.postMessage({
    property: reearth.widget.property,
  });
});
