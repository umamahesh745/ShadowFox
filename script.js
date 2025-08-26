// Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Fade-in Animation on Scroll
const faders = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
const certificateForm = document.getElementById('certificateForm');
const certGrid = document.getElementById('certGrid');
const fileInput = document.getElementById('certFile');
const fileNameDisplay = document.getElementById('fileName');
const emptyState = document.getElementById('emptyState');

// Display file name when selected
fileInput.addEventListener('change', () => {
  if(fileInput.files.length > 0){
    fileNameDisplay.textContent = fileInput.files[0].name;
  } else {
    fileNameDisplay.textContent = "No file chosen";
  }
});

// Handle form submission
certificateForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('certName').value.trim();
  const org = document.getElementById('organization').value.trim();
  const date = document.getElementById('issueDate').value;
  const file = fileInput.files[0];

  if(!name || !org || !date || !file){
    alert("Please fill all fields and select a file!");
    return;
  }

  // Create certificate card
  const certCard = document.createElement('div');
  certCard.classList.add('cert-card');

  // File preview
  let filePreview;
  if(file.type.startsWith('image/')){
    filePreview = document.createElement('img');
    filePreview.src = URL.createObjectURL(file);
  } else {
    filePreview = document.createElement('img');
    filePreview.src = 'https://img.icons8.com/ios-filled/100/000000/pdf.png'; // PDF icon
  }

  // Info section
  const certInfo = document.createElement('div');
  certInfo.classList.add('cert-info');
  certInfo.innerHTML = `<h3>${name}</h3>
                        <p>${org}</p>
                        <p>${date}</p>`;

  // Actions
  const actions = document.createElement('div');
  actions.classList.add('cert-actions');
  const viewBtn = document.createElement('button');
  viewBtn.classList.add('view-btn');
  viewBtn.textContent = 'View';
  viewBtn.addEventListener('click', () => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    certCard.remove();
    checkEmptyState();
  });

  actions.appendChild(viewBtn);
  actions.appendChild(deleteBtn);

  certCard.appendChild(filePreview);
  certCard.appendChild(certInfo);
  certCard.appendChild(actions);

  certGrid.appendChild(certCard);

  // Reset form
  certificateForm.reset();
  fileNameDisplay.textContent = "No file chosen";
  checkEmptyState();
});

// Check and toggle empty state
function checkEmptyState(){
  if(certGrid.querySelectorAll('.cert-card').length === 0){
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }
}
