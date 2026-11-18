
// Campus events sample data

const events = [
    {
        id: 1,
        name: "Hackathon 2026",
        category: "Technical",
        date: "25 November 2026",
        time: "10:00 AM",
        location: "Innovation Lab",
        icon: "💻",
        color: "purple"
    },
    {
        id: 2,
        name: "Cultural Fest",
        category: "Cultural",
        date: "28 November 2026",
        time: "11:00 AM",
        location: "College Auditorium",
        icon: "🎭",
        color: "orange"
    },
    {
        id: 3,
        name: "Web Development Workshop",
        category: "Workshop",
        date: "30 November 2026",
        time: "02:00 PM",
        location: "Computer Lab",
        icon: "🌐",
        color: "blue"
    },
    {
        id: 4,
        name: "Code Competition",
        category: "Technical",
        date: "3 December 2026",
        time: "09:00 AM",
        location: "Seminar Hall",
        icon: "👨‍💻",
        color: "pink"
    },
    {
        id: 5,
        name: "Music & Dance Night",
        category: "Cultural",
        date: "6 December 2026",
        time: "05:00 PM",
        location: "Open Ground",
        icon: "🎵",
        color: "green"
    },
    {
        id: 6,
        name: "AI & ML Workshop",
        category: "Workshop",
        date: "10 December 2026",
        time: "11:00 AM",
        location: "AI Research Lab",
        icon: "🤖",
        color: "yellow"
    }
];

const clubs = [
    {
        name: "Google Developer Group",
        icon: "💻",
        description: "Learn app development, explore new technologies and build projects."
    },
    {
        name: "CodeChef Club",
        icon: "👨‍💻",
        description: "Improve problem-solving and competitive programming skills."
    },
    {
        name: "Minerva",
        icon: "🎨",
        description: "Explore creativity, communication and cultural activities."
    },
    {
        name: "Eco Club",
        icon: "🌱",
        description: "Take part in sustainability and environmental initiatives."
    },
    {
        name: "Photography Club",
        icon: "📸",
        description: "Capture campus moments and improve photography skills."
    },
    {
        name: "Literary Club",
        icon: "📚",
        description: "Explore writing, public speaking and literature."
    }
];

const announcements = [
    {
        icon: "📢",
        title: "Hackathon Registrations Open",
        message: "Registrations are open for the upcoming campus hackathon. Interested students can register now.",
        date: "18 November 2026"
    },
    {
        icon: "📅",
        title: "Cultural Fest Announcement",
        message: "The annual cultural fest is scheduled for 28 November. More details will be shared soon.",
        date: "17 November 2026"
    },
    {
        icon: "💻",
        title: "Technical Workshop",
        message: "A web development workshop will be organized for interested students.",
        date: "16 November 2026"
    },
    {
        icon: "🎓",
        title: "Student Club Updates",
        message: "Students can explore different clubs and participate in upcoming activities.",
        date: "15 November 2026"
    }
];

let registrations = [];
let selectedEvent = null;
let currentFilter = "All";

// Navigation

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    document.getElementById(pageId).classList.add("active-page");

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    const activeLink = document.querySelector(
        `.nav-link[data-section="${pageId}"]`
    );

    if (activeLink) {
        activeLink.classList.add("active");
    }

    const titles = {
        dashboard: "Dashboard",
        events: "Campus Events",
        clubs: "Explore Clubs",
        announcements: "Announcements",
        profile: "My Profile"
    };

    document.getElementById("pageTitle").innerText = titles[pageId];

    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", function(event) {
        event.preventDefault();
        showPage(this.dataset.section);
    });

});

// Event cards

function createEventCard(event) {

    const registered = registrations.some(
        item => item.id === event.id
    );

    return `
        <div class="event-card">
            <div class="event-cover ${event.color}">
                ${event.icon}
            </div>

            <div class="event-info">
                <span class="category">${event.category}</span>

                <h3>${event.name}</h3>

                <p>📅 ${event.date}</p>
                <p>🕒 ${event.time}</p>
                <p>📍 ${event.location}</p>

                <button class="register-btn"
                    onclick="openModal(${event.id})"
                    ${registered ? "disabled" : ""}>
                    ${registered ? "✓ Registered" : "Register Now →"}
                </button>
            </div>
        </div>
    `;
}

function renderEvents() {

    const dashboardEvents = document.getElementById("dashboardEvents");
    const allEvents = document.getElementById("allEvents");

    dashboardEvents.innerHTML = events
        .slice(0, 3)
        .map(createEventCard)
        .join("");

    let filtered = events.filter(event => {

        const matchesCategory =
            currentFilter === "All" ||
            event.category === currentFilter;

        const searchText = document
            .getElementById("eventSearch").value
            .toLowerCase();

        const matchesSearch =
            event.name.toLowerCase().includes(searchText) ||
            event.category.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    allEvents.innerHTML = filtered.length
        ? filtered.map(createEventCard).join("")
        : "<p>No matching events found.</p>";

    document.getElementById("eventCount").innerText = events.length;
    document.getElementById("registrationCount").innerText = registrations.length;
}

// Search events

document.getElementById("eventSearch").addEventListener("input", renderEvents);

// Category filters

document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", function() {

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("selected");
        });

        this.classList.add("selected");

        currentFilter = this.dataset.filter;

        renderEvents();
    });

});

// Clubs

function renderClubs() {

    const clubList = document.getElementById("clubList");

    clubList.innerHTML = clubs.map((club, index) => `
        <div class="club-card">
            <div class="club-icon">${club.icon}</div>
            <h3>${club.name}</h3>
            <p>${club.description}</p>
            <button onclick="joinClub(${index})">
                Explore Club →
            </button>
        </div>
    `).join("");

}

function joinClub(index) {
    showToast("You selected " + clubs[index].name + "!");
}

// Announcements

function renderAnnouncements() {

    const html = announcements.map(item => `
        <div class="announcement">
            <div class="announcement-icon">${item.icon}</div>

            <div>
                <h3>${item.title}</h3>
                <p>${item.message}</p>
                <p>📅 ${item.date}</p>
            </div>
        </div>
    `).join("");

    document.getElementById("dashboardAnnouncements").innerHTML =
        html.slice(0, 0) || announcements.slice(0, 2).map(item => `
            <div class="announcement">
                <div class="announcement-icon">${item.icon}</div>
                <div>
                    <h3>${item.title}</h3>
                    <p>${item.message}</p>
                    <p>📅 ${item.date}</p>
                </div>
            </div>
        `).join("");

    document.getElementById("allAnnouncements").innerHTML = html;
}


function openModal(id) {

    selectedEvent = events.find(event => event.id === id);

    if (!selectedEvent) return;

    if (registrations.some(item => item.id === id)) {
        showToast("You are already registered!");
        return;
    }

    document.getElementById("modalEventName").innerText =
        selectedEvent.name;

    document.getElementById("registrationModal").classList.add("show");
}

function closeModal() {
    document.getElementById("registrationModal").classList.remove("show");
}

document.getElementById("registrationForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();

    if (!name || !email || !selectedEvent) return;

    registrations.push({
        id: selectedEvent.id,
        name: name,
        email: email
    });

    renderEvents();

    closeModal();

    this.reset();

    showToast("Registration successful! 🎉");

});

document.getElementById("registrationModal").addEventListener("click", function(event) {

    if (event.target === this) {
        closeModal();
    }

});


function showToast(message) {

    const toast = document.getElementById("toast");

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}


renderEvents();
renderClubs();
renderAnnouncements();
