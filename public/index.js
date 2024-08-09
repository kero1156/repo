// public/index.js
window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.user-name').forEach((elem) => {
      elem.addEventListener('click', (event) => {
        alert(event.target.innerHTML);
      });
    });
  
    document.querySelector('.send-button').addEventListener('click', (event) => {
      const newElement = document.createElement('li');
      const text = document.querySelector('.input-text').value;
      newElement.innerHTML = text;

      document.querySelector('.user-list').appendChild(newElement);
      // ブラウザのコンソールで確認
      fetch('/api/user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: text }) })

    });



//
    document.querySelector('.delete-button').addEventListener('click', (event) => {

      window.location.reload(false);

      // const newElement = document.createElement('li');
      // const text = document.querySelector('.input-text').value;
      // newElement.innerHTML = text;
      // const listItems = Array.from(document.querySelectorAll('.user-name'))

      
      // for(const element of listItems){
      //   console.log(element.innerText);
      //   if (element.innerText === text){
          
      //     document.querySelector('.user-list').removeChild(element);
      //     console.log("#")
      //     break;
      //     }
      // }


      const newElement = document.createElement('li');
      const text = document.querySelector('.delete-row').value;
      newElement.innerHTML = text;
      const listItems = Array.from(document.querySelectorAll('.user-name'))
      const num=Number(text);
      console.log(num);
      
      let count=1;

      
      for(const element of listItems){
        
        console.log(element.innerText);
        console.log(count)
        if (count === num){
          document.querySelector('.user-list').removeChild(element);
          const e=element.innerText
          console.log(e)
          console.log(text)
          console.log("#")
          fetch('/api/user-delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({name:e}) })
          break;
          }
          count=count+1;

      }





      


    });


    document.querySelector('.change-button').addEventListener('click', (event) => {

      // window.location.reload();


      const newElement = document.createElement('li');
      const text = document.querySelector('.change-row').value;
    

      const text2 = document.querySelector('.input-text2').value;
      newElement.innerHTML = text2;
      console.log(text2);


      const listItems = Array.from(document.querySelectorAll('.user-name'))
      const num=Number(text);
      // console.log(num);
      
      let count=1;
      

      
      for(const element of listItems){
        // console.log(element.innerText);
        // console.log(count)
        if (count === num){
          
          // document.querySelector('.user-list').removeChild(element);

          // const parent = document.querySelector(parentSelector);
          // parent.replaceChild(newChild, oldChild);
          
          // document.querySelector('.user-list').appendChild(newElement);
          const e=element.innerText
          const names=[e,text2]
          element.replaceWith(newElement);
          
          
        
          
          // console.log("#")
          fetch('/api/user-change', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ names:names }) })
          break;
          
          }
          count=count+1;

      }

      



      


    });
  

//








  });