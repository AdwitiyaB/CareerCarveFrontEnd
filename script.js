// Get the section list container
const sectionList = document.getElementById('section-list');

// Get all the sections
const sections = sectionList.getElementsByClassName('section');

let dragSection = null;

// Add event listeners for drag and drop
for (const section of sections) {
  section.addEventListener('dragstart', handleDragStart);
  section.addEventListener('dragover', handleDragOver);
  section.addEventListener('dragenter', handleDragEnter);
  section.addEventListener('dragleave', handleDragLeave);
  section.addEventListener('drop', handleDrop);
  section.addEventListener('dragend', handleDragEnd);
}

// Handle drag start event
function handleDragStart(event) {
  dragSection = this;
  this.classList.add('dragging');
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', this.innerHTML);
}

// Handle drag over event
function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

// Handle drag enter event
function handleDragEnter(event) {
  this.classList.add('drag-over');
}

// Handle drag leave event
function handleDragLeave(event) {
  this.classList.remove('drag-over');
}

// Handle drop event
function handleDrop(event) {
  event.preventDefault();
  event.stopPropagation();
  this.classList.remove('drag-over');

  // Reorder the sections based on the drag and drop
  const newIndex = Array.from(sections).indexOf(this);
  const oldIndex = Array.from(sections).indexOf(dragSection);

  if (newIndex !== oldIndex) {
    sectionList.insertBefore(dragSection, newIndex > oldIndex ? this.nextSibling : this);
    document.getElementById('save-button').disabled = false;
  }
}

// Handle drag end event
function handleDragEnd(event) {
  this.classList.remove('dragging');

  dragSection = null;
}

// Get the toggle buttons
const toggleButtons = document.getElementsByClassName('toggle-button');

// Add event listeners for toggle buttons
for (const toggleButton of toggleButtons) {
  toggleButton.addEventListener('click', handleToggle);
}

// Handle toggle event
function handleToggle(event) {
  const section = this.closest('.section');
  const toggleIcon = this.querySelector('i');

  section.classList.toggle('section-off');

  if (section.classList.contains('section-off')) {
    toggleIcon.classList.remove('uil-toggle-on');
    toggleIcon.classList.add('uil-toggle-off');
    toggleButton.classList.remove('powered-blue');
  } else {
    toggleIcon.classList.remove('uil-toggle-off');
    toggleIcon.classList.add('uil-toggle-on');
    toggleButton.classList.add('powered-blue');
  }

  document.getElementById('save-button').disabled = false;
}

// Get the edit buttons
const editButtons = document.getElementsByClassName('edit-button');

// Add event listeners for edit buttons
for (const editButton of editButtons) {
  editButton.addEventListener('click', handleEdit);
}

// Handle edit event
function handleEdit(event) {
  const section = this.closest('.section');
  const sectionName = section.querySelector('.section-name');

  const sectionNameInput = document.createElement('input');
  sectionNameInput.type = 'text';
  sectionNameInput.value = sectionName.textContent;

  sectionName.textContent = '';
  sectionName.appendChild(sectionNameInput);

  sectionNameInput.focus();
  sectionNameInput.addEventListener('blur', handleSave);
}

// Handle save event
function handleSave(event) {
  const sectionName = this.value;
  const section = this.closest('.section');
  const sectionNameElement = section.querySelector('.section-name');

  sectionNameElement.textContent = sectionName;

  document.getElementById('save-button').disabled = false;
}

// Save button event listener
document.getElementById('save-button').addEventListener('click', handleSaveButtonClick);

// Handle save button click
function handleSaveButtonClick(event) {
  document.getElementById('save-button').disabled = true;
}

// Function to show section info
function showInfo(sectionTitle) {
  const modal = document.getElementById('info-modal');
  const sectionInfo = getInfoForSection(sectionTitle);

  document.getElementById('section-title').textContent = sectionTitle;
  document.getElementById('section-info').textContent = sectionInfo;

  modal.style.display = 'block';
}

// Function to get section info
function getInfoForSection(sectionTitle) {
  var sectionInfo = "";

  // Add section information based on the section name
  switch (sectionTitle) {
    case "Profile Summary":
      sectionInfo = "This section provides a summary of your profile, including your skills, strengths, and career objectives.";
      return 'Section info for ' + sectionInfo;
    case "Academic and Cocurricular Achievements":
      sectionInfo = "In this section, you can highlight your academic achievements, such as awards, scholarships, and honors, as well as your participation in cocurricular activities.";
      return 'Section info for ' + sectionInfo;
    case "Summer Internship Experience":
      sectionInfo = "Include details about your summer internship experience, such as the company you worked for, your role, and the skills you developed.";
      return 'Section info for ' + sectionInfo;
    case "Work Experience":
      sectionInfo = "In this section, you can showcase your professional work experience, including details about your previous roles, companies, and key accomplishments.";
      return 'Section info for ' + sectionInfo;
    case "Projects":
      sectionInfo = "Highlight your significant projects, such as software development projects, research projects, or any other relevant projects.";
      return 'Section info for ' + sectionInfo;
    case "Certifications":
      sectionInfo = "Include details about your certifications, such as the certification name, issuing organization, and the skills or knowledge you acquired.";
      return 'Section info for ' + sectionInfo;
    case "LeaderShip Positions":
      sectionInfo = "List any leadership positions you have held, such as being a team leader, club president, or any other leadership roles.";
      return 'Section info for ' + sectionInfo;
    case "Extracurricular":
      sectionInfo = "This section allows you to mention your involvement in extracurricular activities, such as sports, clubs, volunteering, or community service.";
      return 'Section info for ' + sectionInfo;
    case "Education":
      sectionInfo = "Include information about your educational background, such as your degrees, majors, educational institutions, and notable academic achievements.";
      return 'Section info for ' + sectionInfo;
    default:
      sectionInfo = "No information available for this section.";
      return 'Section info for ' + sectionInfo;
  }
}

// Close info modal
function closeInfoModal() {
  const modal = document.getElementById('info-modal');
  modal.style.display = 'none';
}

// Close info modal when clicking outside the modal
window.addEventListener('click', function (event) {
  const modal = document.getElementById('info-modal');
  if (event.target == modal) {
    closeInfoModal();
  }
});