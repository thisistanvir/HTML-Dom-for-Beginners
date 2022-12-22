// milestonesData
const milestonesData = JSON.parse(data).data;

// load course milestones
function loadMilestones() {
	const milestones = document.querySelector(".milestones");

	milestones.innerHTML = `${milestonesData
		.map(function (milestone) {
			return `<div class="milestone border-b" id="${milestone._id}">
    <div class="flex">
      <div class="checkbox"><input type="checkbox" onclick="markMilestone(this, ${
				milestone._id
			})" /></div>
      <div onclick="openMilestone(this, ${milestone._id})">
        <p>
          ${milestone.name}
          <span><i class="fas fa-chevron-down"></i></span>
        </p>
      </div>
    </div>
    <div class="hidden_panel">
      ${milestone.modules
				.map(function (module) {
					return `<div class="module border-b">
          <p>${module.name}</p>
        </div>`;
				})
				.join("")}
    </div>
  </div>`;
		})
		.join("")}`;
}

// function: openMilestone
function openMilestone(milestoneElement, id) {
	const currentPanel = milestoneElement.parentNode.nextElementSibling;
	const shownPanel = document.querySelector(".show");
	const active = document.querySelector(".active");

	// first remove active class if any [other than the clicked]
	if (active && !milestoneElement.classList.contains("active")) {
		active.classList.remove("active");
	}

	// toggle current clicked one
	milestoneElement.classList.toggle("active");

	// first hide previous panel if open [other than the clicked one]
	if (!currentPanel.classList.contains("show") && shownPanel)
		shownPanel.classList.remove("show");

	// toggle clicked one current panel
	currentPanel.classList.toggle("show");

	showMilestone(id);
}

// show milestone image and details
function showMilestone(id) {
	const milestoneImage = document.querySelector(".milestoneImage");
	const name = document.querySelector(".title");
	const details = document.querySelector(".details");

	milestoneImage.style.opacity = "0";
	milestoneImage.src = milestonesData[id].image;
	name.innerText = milestonesData[id].name;
	details.innerText = milestonesData[id].description;
}

// Listen fot hero image load
const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function () {
	this.style.opacity = "1";
};

// mark milestone
function markMilestone(checkbox, id) {
	const doneList = document.querySelector(".doneList");
	const milestoneList = document.querySelector(".milestones");
	const item = document.getElementById(id);

	if (checkbox.checked) {
		// mark as done
		milestoneList.removeChild(item);
		doneList.appendChild(item);
	} else {
		// back to main list
		doneList.removeChild(item);
		milestoneList.appendChild(item);

		// Create Array
		const allMilestone = milestoneList.querySelectorAll(".milestone");
		const milestoneListArray = [...allMilestone];

		// sort Array
		const sortedMilestoneListArray = milestoneListArray.sort((item1, item2) => {
			return item1.id - item2.id;
		});

		// reload sorted milestones
		sortedMilestoneListArray.forEach(function (item) {
			milestoneList.appendChild(item);
		});
	}
}

loadMilestones();
