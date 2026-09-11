/**
 * Aurora — the Desktop launcher (/desk).
 *
 * Augmented with the modern Workspace App Launcher design from Nexus Theme:
 * - Enterprise Core greeting with live user name & quick jump shortcuts
 * - Category filter bar (All Modules, Financials & Commerce, Operations & Supply, Core System & Dev)
 * - Realtime module search
 * - 10 responsive, color-coded module cards with instant routing
 *
 * Keeps all native Aurora desktop features (frosted navbar, scroll condensation) intact.
 */
import { feature } from "./settings";
import { motion_off, raf_throttle, debounce } from "./utils";

const GRID = ".desktop-wrapper .icons";

/** Give each icon its position so CSS can stagger the entrance. */
const animate_icons = debounce(() => {
	if (motion_off() || !feature("reveal")) return;

	document.querySelectorAll(GRID).forEach((grid) => {
		if (grid.closest(".folder-icon")) return;

		const icons = Array.from(grid.children).filter((n) =>
			n.classList.contains("desktop-icon")
		);
		if (!icons.length) return;

		icons.forEach((el, i) => {
			if (el.dataset.auroraIn) return;
			el.dataset.auroraIn = "1";
			el.style.setProperty("--aurora-i", String(Math.min(i, 24)));
			el.classList.add("aurora-desk-in");
			el.addEventListener(
				"animationend",
				() => el.classList.remove("aurora-desk-in"),
				{ once: true }
			);
		});
	});
}, 40);

const condense = raf_throttle(() => {
	if (!feature("condensed_header")) return;
	const bar = document.querySelector(".desktop-wrapper .navbar-container");
	if (!bar) return;

	const scroller = document.querySelector(".desktop-wrapper")?.closest(".page-container");
	const offset = Math.max(window.scrollY || 0, scroller?.scrollTop || 0);
	bar.classList.toggle("aurora-condensed", offset > 12);
});

/* --------------------------------------------------------------------------
   Primary Module Cards Definition (Matching Reference Design)
   -------------------------------------------------------------------------- */
const PRIMARY_MODULE_TEMPLATES = [
	// Financials & Commerce
	{
		name: "Invoicing",
		category: "financials",
		badge: "Accounting",
		subtext: "Invoices, Payments & Accounts",
		iconClass: "icon-teal",
		svg: `<rect height="18" rx="3" width="18" x="3" y="3"></rect><path d="M7 8h10M7 12h10M7 16h6"></path><circle cx="16" cy="16" fill="currentColor" r="1"></circle>`,
		slug: "invoicing",
	},
	{
		name: "Selling",
		category: "financials",
		badge: "Sales",
		subtext: "CRM, Quotes & Sales Orders",
		iconClass: "icon-teal",
		svg: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>`,
		slug: "selling",
	},
	{
		name: "Buying",
		category: "financials",
		badge: "Procurement",
		subtext: "Purchases, Suppliers & POs",
		iconClass: "icon-blue",
		svg: `<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" x2="7.01" y1="7" y2="7"></line>`,
		slug: "buying",
	},
	{
		name: "CRM",
		category: "financials",
		badge: "Leads",
		subtext: "Leads, Deals & Pipeline",
		iconClass: "icon-teal",
		svg: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`,
		slug: "crm",
	},
	// Operations & Supply
	{
		name: "Stock",
		category: "operations",
		badge: "Inventory",
		subtext: "Warehouses & Stock Ledger",
		iconClass: "icon-teal",
		svg: `<line x1="16.5" x2="7.5" y1="9.4" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" x2="12" y1="22.08" y2="12"></line>`,
		slug: "stock",
	},
	{
		name: "Manufacturing",
		category: "operations",
		badge: "Production",
		subtext: "BOM & Work Orders",
		iconClass: "icon-teal",
		svg: `<path d="M2 20h20"></path><path d="M18 20V8l-6 4V8L6 12v8"></path><path d="M6 4h4v4H6z"></path>`,
		slug: "manufacturing",
	},
	{
		name: "Projects",
		category: "operations",
		badge: "Projects",
		subtext: "Tasks, Milestones & Timelines",
		iconClass: "icon-blue",
		svg: `<rect height="14" rx="2" width="20" x="2" y="3"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line><path d="M7 8h10M7 12h6"></path>`,
		slug: "projects",
	},
	// Core System & Dev
	{
		name: "Build",
		category: "core",
		badge: "Developer",
		subtext: "DocTypes, APIs & Framework",
		iconClass: "icon-slate",
		svg: `<path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke-linecap="round" stroke-linejoin="round"></path>`,
		slug: "build",
	},
	{
		name: "ERPNext Settings",
		category: "core",
		badge: "Setup",
		subtext: "Company & System Settings",
		iconClass: "icon-slate",
		svg: `<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>`,
		slug: "erpnext-settings",
	},
	{
		name: "Users",
		category: "core",
		badge: "Access",
		subtext: "Users, Roles & Permissions",
		iconClass: "icon-slate",
		svg: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline>`,
		slug: "users",
	},
];

function getLauncherModules() {
	const allowed = (window.frappe?.boot && window.frappe.boot.allowed_workspaces) || [];
	if (allowed.length > 0) {
		const allowedNames = new Set(allowed.map((w) => (w.title || w.name).toLowerCase()));
		const allowedSlugs = new Set(
			allowed.map((w) =>
				window.frappe.router
					? window.frappe.router.slug(w.name)
					: w.name.toLowerCase().replace(/\s+/g, "-")
			)
		);

		const filtered = PRIMARY_MODULE_TEMPLATES.filter(
			(m) => allowedNames.has(m.name.toLowerCase()) || allowedSlugs.has(m.slug)
		);

		if (filtered.length > 0) {
			return filtered;
		}
	}

	return PRIMARY_MODULE_TEMPLATES;
}

export function renderModernAppLauncher() {
	const route = window.frappe?.get_route ? window.frappe.get_route() : [];
	const isDesktopPage = !route[0] || route[0] === "desktop" || route[0] === "app";

	const desktopWrapper = document.querySelector(".desktop-wrapper");
	if (!desktopWrapper) return;

	const desktopContainer = desktopWrapper.querySelector(".desktop-container");
	if (!desktopContainer) return;

	if (!isDesktopPage) {
		document.body.classList.remove("nexus-modern-launcher-active");
		const existing = desktopContainer.querySelector(".nexus-launcher-wrapper");
		if (existing) existing.remove();
		return;
	}

	document.body.classList.add("nexus-modern-launcher-active");

	// Hide original icon grid
	const defaultIcons = desktopContainer.querySelector(".icons-container");
	if (defaultIcons) {
		defaultIcons.style.display = "none";
	}
	const standardGrid = desktopContainer.querySelector(".standard-grid");
	if (standardGrid) {
		standardGrid.style.display = "none";
	}

	// Avoid re-creating if already present
	if (desktopContainer.querySelector(".nexus-launcher-wrapper")) return;

	const modules = getLauncherModules();
	const userName = window.frappe?.session?.user_fullname || "Administrator";

	const wrapper = document.createElement("div");
	wrapper.className = "nexus-launcher-wrapper";

	wrapper.innerHTML = `
		<!-- 1. Hero / Greeting Section -->
		<section class="nexus-hero-section">
			<div>
				<div class="hero-badge">
					<span class="pulse-dot"></span>
					ENTERPRISE CORE V16.0
				</div>
				<h1 class="hero-title">
					Welcome back, ${userName} <span class="wave-emoji">👋</span>
				</h1>
				<p class="hero-subtitle">
					Unified desk workspace. Launch any module, track operations, or explore doctypes.
				</p>
			</div>
			<div class="hero-quick-jumps">
				<span class="quick-jump-label">Quick Jumps:</span>
				<span class="quick-jump-pill" data-slug="invoicing">Invoicing</span>
				<span class="quick-jump-pill" data-slug="selling">Selling</span>
				<span class="quick-jump-pill" data-slug="stock">Stock</span>
				<span class="quick-jump-pill" data-slug="manufacturing">Manufacturing</span>
				<span class="quick-jump-pill" data-slug="buying">Buying</span>
				<span class="quick-jump-pill" data-slug="build">Build</span>
			</div>
		</section>

		<!-- 2. Filter Bar -->
		<div class="nexus-filter-bar">
			<div class="category-tabs">
				<button class="category-tab-btn active" data-category="all">
					All Modules <span class="count-pill">${modules.length}</span>
				</button>
				<button class="category-tab-btn" data-category="financials">
					Financials & Commerce
				</button>
				<button class="category-tab-btn" data-category="operations">
					Operations & Supply
				</button>
				<button class="category-tab-btn" data-category="core">
					Core System & Dev
				</button>
			</div>

			<div class="launcher-search-box">
				<svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
				<input type="text" id="nexus-module-search" placeholder="Search modules or workspaces..." />
			</div>
		</div>

		<!-- 3. Modules Grid (Full Width Responsive) -->
		<div class="nexus-modules-grid">
			${modules
				.map(
					(mod) => `
				<div class="module-card" data-category="${mod.category}" data-name="${mod.name}" data-slug="${mod.slug}">
					<div class="card-top">
						<div class="card-icon-box ${mod.iconClass}">
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
								${mod.svg}
							</svg>
						</div>
						<div class="card-top-right">
							<span class="card-badge">${mod.badge}</span>
							<svg class="card-arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
							</svg>
						</div>
					</div>
					<div class="card-body-text">
						<h3 class="card-title">${mod.name}</h3>
						<p class="card-subtext">${mod.subtext}</p>
					</div>
				</div>
			`
				)
				.join("")}
		</div>
	`;

	// Clear desktopContainer and append full-width wrapper
	desktopContainer.innerHTML = "";
	desktopContainer.appendChild(wrapper);

	// Event Listeners: Card Clicks
	wrapper.querySelectorAll(".module-card").forEach((card) => {
		card.addEventListener("click", () => {
			const slug = card.getAttribute("data-slug");
			if (slug && window.frappe?.set_route) {
				window.frappe.set_route(slug);
			}
		});
	});

	// Event Listeners: Quick Jumps
	wrapper.querySelectorAll(".quick-jump-pill").forEach((pill) => {
		pill.addEventListener("click", () => {
			const slug = pill.getAttribute("data-slug");
			if (slug && window.frappe?.set_route) {
				window.frappe.set_route(slug);
			}
		});
	});

	// Event Listeners: Category Filter Tabs & Search
	const tabBtns = wrapper.querySelectorAll(".category-tab-btn");
	const cards = wrapper.querySelectorAll(".module-card");
	const searchInput = wrapper.querySelector("#nexus-module-search");

	let currentCategory = "all";
	let currentSearch = "";

	function filterCards() {
		let visibleCount = 0;
		cards.forEach((card) => {
			const cat = card.getAttribute("data-category");
			const name = (card.getAttribute("data-name") || "").toLowerCase();
			const sub = (card.querySelector(".card-subtext")?.textContent || "").toLowerCase();

			const matchCat = currentCategory === "all" || cat === currentCategory;
			const matchSearch =
				!currentSearch || name.includes(currentSearch) || sub.includes(currentSearch);

			if (matchCat && matchSearch) {
				card.classList.remove("nexus-hidden");
				visibleCount++;
			} else {
				card.classList.add("nexus-hidden");
			}
		});

		const countPill = wrapper.querySelector(
			'.category-tab-btn[data-category="all"] .count-pill'
		);
		if (countPill && currentCategory === "all") {
			countPill.textContent = visibleCount;
		}
	}

	tabBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			tabBtns.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");
			currentCategory = btn.getAttribute("data-category");
			filterCards();
		});
	});

	if (searchInput) {
		searchInput.addEventListener("input", (e) => {
			currentSearch = e.target.value.toLowerCase().trim();
			filterCards();
		});
	}
}

export function init() {
	// the launcher re-renders its grid in place on every update()
	new MutationObserver(() => {
		if (!document.querySelector(".desktop-wrapper")) return;
		renderModernAppLauncher();
		animate_icons();
	}).observe(document.body, { childList: true, subtree: true });

	$(document).on("page-change", () => {
		renderModernAppLauncher();
		animate_icons();
		condense();
	});

	if (window.frappe?.router) {
		window.frappe.router.on("change", () => {
			setTimeout(() => {
				renderModernAppLauncher();
			}, 100);
		});
	}

	window.addEventListener("scroll", condense, { passive: true });
	document.addEventListener("scroll", condense, { passive: true, capture: true });

	renderModernAppLauncher();
	animate_icons();
}
