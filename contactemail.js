function toggleUniversityOptions() {
    var isAouStudent = document.getElementById('aou-student').value;

    var idGroup = document.getElementById('id-group');
    var branchGroup = document.getElementById('branch-group');

    if (isAouStudent === 'yes') {
        idGroup.classList.remove('hidden');
        branchGroup.classList.remove('hidden');
    } else{
        idGroup.classList.add('hidden');
        branchGroup.classList.add('hidden');
    }
}




const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  console.log(json);
  
  result.innerHTML = "Please wait..."

  result.style.display = 'flex';
  result.style.color = 'red';


  fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: json
  })
  .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
          result.style.color = 'green';
          result.innerHTML = "Form submitted successfully";
      } else {
          console.log(response);
          result.innerHTML = json.message;
      }
  })
  .catch(error => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
  })
  .then(function() {
      form.reset();
      setTimeout(() => {
          result.style.display = "none";
      }, 3000);
  });
});
