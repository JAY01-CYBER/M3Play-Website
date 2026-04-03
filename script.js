const slider = document.getElementById("slider");

if (slider) {
  setInterval(() => {
    slider.scrollBy({
      left: 256,
      behavior: "smooth"
    });

    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
      slider.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    }
  }, 2600);
}

const repoApi = "https://api.github.com/repos/JAY01-CYBER/M3-Play";
const releaseApi = "https://api.github.com/repos/JAY01-CYBER/M3-Play/releases/latest";

async function loadRepoData() {
  try {
    const repoRes = await fetch(repoApi);
    const repoData = await repoRes.json();

    const starsEl = document.getElementById("repo-stars");
    const forksEl = document.getElementById("repo-forks");
    const descEl = document.getElementById("repo-description");

    if (starsEl && repoData.stargazers_count !== undefined) {
      starsEl.textContent = repoData.stargazers_count;
    }

    if (forksEl && repoData.forks_count !== undefined) {
      forksEl.textContent = repoData.forks_count;
    }

    if (descEl && repoData.description) {
      descEl.textContent = repoData.description;
    }
  } catch (error) {
    console.error("Repo fetch failed:", error);
  }
}

async function loadReleaseData() {
  try {
    const releaseRes = await fetch(releaseApi);
    const releaseData = await releaseRes.json();

    const versionEl = document.getElementById("latest-version");
    const dateEl = document.getElementById("release-date");
    const nameEl = document.getElementById("latest-release-name");
    const bodyEl = document.getElementById("latest-release-body");
    const linkEl = document.getElementById("latest-release-link");
    const downloadEl = document.getElementById("stable-download-btn");
    const cardVersionEl = document.getElementById("download-card-version");

    if (versionEl) {
      versionEl.textContent = releaseData.tag_name || releaseData.name || "N/A";
    }

    if (dateEl && releaseData.published_at) {
      const d = new Date(releaseData.published_at);
      dateEl.textContent = d.toLocaleDateString();
    }

    if (nameEl) {
      nameEl.textContent = releaseData.name || releaseData.tag_name || "Latest Release";
    }

    if (bodyEl) {
      const body = (releaseData.body || "Latest release available on GitHub.")
        .replace(/\r?\n|\r/g, " ")
        .trim();
      bodyEl.textContent = body.length > 140 ? body.slice(0, 140) + "..." : body;
    }

    if (linkEl && releaseData.html_url) {
      linkEl.href = releaseData.html_url;
    }

    if (downloadEl && releaseData.html_url) {
      downloadEl.href = releaseData.html_url;
    }

    if (cardVersionEl) {
      cardVersionEl.textContent = `Latest stable build: ${releaseData.tag_name || releaseData.name || "Available now"}`;
    }
  } catch (error) {
    console.error("Release fetch failed:", error);
  }
}

loadRepoData();
loadReleaseData();
