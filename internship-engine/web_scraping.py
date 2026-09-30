import requests
import time
import random
import json
import os
from fake_useragent import UserAgent
from bs4 import BeautifulSoup


# ---------------------------------------------------------------------------
# 1. SCRAPER — fetches and saves raw HTML for one source
# ---------------------------------------------------------------------------

class Retrieve:
    def __init__(self, url, website_name, max_retries=2):
        self.url = url
        self.website_name = website_name
        self.max_retries = max_retries
        self.session = requests.Session()

    def _headers(self):
        return {
            "User-Agent": UserAgent().random,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,/;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
        }

    def get_data(self):
        """Saves {website_name}.html on success. Returns True/False."""
        for attempt in range(1, self.max_retries + 1):
            delay = random.uniform(3, 7)
            print(f"[{self.website_name}] waiting {delay:.2f}s before request "
                  f"(attempt {attempt}/{self.max_retries})...")
            time.sleep(delay)

            try:
                r = self.session.get(self.url, headers=self._headers(), timeout=15)

                if r.status_code == 200:
                    with open(f"{self.website_name}.html", "w", encoding="utf-8") as f:
                        f.write(r.text)
                    print(f"[{self.website_name}] Success! HTML saved.")
                    return True

                elif r.status_code in (403, 429, 999):
                    print(f"[{self.website_name}] Blocked (status {r.status_code}). "
                          f"Retrying..." if attempt < self.max_retries
                          else f"[{self.website_name}] Blocked (status {r.status_code}). Giving up.")
                    continue

                else:
                    print(f"[{self.website_name}] Unexpected status code: {r.status_code}")
                    return False

            except requests.exceptions.Timeout:
                print(f"[{self.website_name}] Timeout — site too slow or blocking silently.")
            except requests.exceptions.ConnectionError as e:
                print(f"[{self.website_name}] Connection error: {e}")
            except Exception as e:
                print(f"[{self.website_name}] Unexpected error: {e}")

        return False


# ---------------------------------------------------------------------------
# 2. EXTRACTORS — parse saved HTML into clean dicts
# ---------------------------------------------------------------------------

def _load(file_path):
    if not os.path.exists(file_path):
        return None
    with open(file_path, "r", encoding="utf-8") as f:
        return BeautifulSoup(f.read(), "html.parser")


def extract_internshala_data(file_path):
    soup = _load(file_path)
    if not soup:
        return []
    results = []
    cards = soup.find_all("div", class_="individual_internship")  # <-- CHECK THIS
    for card in cards:
        title_tag = card.find("h3", class_="job-internship-name")
        company_tag = card.find("p", class_="company-name")
        location_tag = card.find("a", class_="location_link")
        link_tag = title_tag.find("a") if title_tag else None
        results.append({
            "source": "Internshala",
            "title": title_tag.get_text(strip=True) if title_tag else None,
            "company": company_tag.get_text(strip=True) if company_tag else None,
            "location": location_tag.get_text(strip=True) if location_tag else None,
            "link": "https://internshala.com" + link_tag["href"] if link_tag and link_tag.get("href") else None,
        })
    return results


def extract_naukri_data(file_path):
    soup = _load(file_path)
    if not soup:
        return []
    results = []
    cards = soup.find_all("div", class_="cust-job-tuple")  # <-- CHECK THIS
    for card in cards:
        title_tag = card.find("a", class_="title")
        company_tag = card.find("a", class_="comp-name")
        location_tag = card.find("span", class_="locWdth")
        results.append({
            "source": "Naukri",
            "title": title_tag.get_text(strip=True) if title_tag else None,
            "company": company_tag.get_text(strip=True) if company_tag else None,
            "location": location_tag.get_text(strip=True) if location_tag else None,
            "link": title_tag["href"] if title_tag and title_tag.get("href") else None,
        })
    return results


def extract_indeed_data(file_path):
    soup = _load(file_path)
    if not soup:
        return []
    results = []
    cards = soup.find_all("div", class_="job_seen_beacon")  # <-- CHECK THIS
    for card in cards:
        title_tag = card.find("h2", class_="jobTitle")
        company_tag = card.find("span", class_="companyName")
        location_tag = card.find("div", class_="companyLocation")
        link_tag = title_tag.find("a") if title_tag else None
        results.append({
            "source": "Indeed",
            "title": title_tag.get_text(strip=True) if title_tag else None,
            "company": company_tag.get_text(strip=True) if company_tag else None,
            "location": location_tag.get_text(strip=True) if location_tag else None,
            "link": "https://www.indeed.com" + link_tag["href"] if link_tag and link_tag.get("href") else None,
        })
    return results


def extract_linkedin_data(file_path):
    soup = _load(file_path)
    if not soup:
        return []
    results = []
    cards = soup.find_all("div", class_="base-card")  # <-- CHECK THIS
    for card in cards:
        title_tag = card.find("h3", class_="base-search-card__title")
        company_tag = card.find("h4", class_="base-search-card__subtitle")
        location_tag = card.find("span", class_="job-search-card__location")
        link_tag = card.find("a", class_="base-card__full-link")
        results.append({
            "source": "LinkedIn",
            "title": title_tag.get_text(strip=True) if title_tag else None,
            "company": company_tag.get_text(strip=True) if company_tag else None,
            "location": location_tag.get_text(strip=True) if location_tag else None,
            "link": link_tag["href"] if link_tag and link_tag.get("href") else None,
        })
    return results


# ---------------------------------------------------------------------------
# 3. MAIN — ties scraping + extraction together for all 4 sources
# ---------------------------------------------------------------------------

def build_urls(search):
    search_encoded = search.replace(" ", "%20")
    return {
        "linkedin": (
            f"https://www.linkedin.com/jobs/search/?keywords={search_encoded}"
            f"%20internship&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true"
        ),
        "internshala": f"https://internshala.com/internships/keywords-{search_encoded}/",
    }


def main():
    search = input("Enter skill/keyword to search jobs for: ").strip()
    urls = build_urls(search)

    extractors = {
        "linkedin": extract_linkedin_data,
        "internshala": extract_internshala_data,
    }

    sources = {}
    all_results = []

    for name, url in urls.items():
        scraper = Retrieve(url=url, website_name=name)
        sources[name] = scraper.get_data()

    for name, ok in sources.items():
        if ok:
            jobs = extractors[name](f"{name}.html")
            print(f"Extracted {len(jobs)} jobs from {name.capitalize()}.")
            all_results.extend(jobs)
        else:
            print(f"Skipping extraction for {name.capitalize()} (fetch failed).")

    with open("extracted_jobs.json", "w", encoding="utf-8") as f:
        json.dump(all_results, f, indent=4, ensure_ascii=False)

    print(f"\nTotal jobs saved: {len(all_results)} -> extracted_jobs.json")


if __name__ == "__main__":
    main()


