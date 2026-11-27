const { execFileSync } = require("child_process");
const fs = require("fs");

const git = (args, options = {}) =>
  execFileSync("git", args, { encoding: "utf8", ...options }).trim();

function datesThrough(today) {
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const last = new Date(2026, 11, 31);
  const dates = [];
  for (const day = new Date(2026, 0, 1); day <= end && day <= last; day.setDate(day.getDate() + 1)) {
    dates.push(`${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`);
  }
  return dates;
}

function main() {
  if (git(["status", "--porcelain"])) {
    throw new Error("Working tree must be clean before creating commits.");
  }
  const existing = new Set(git(["log", "--format=%s", "--all"]).split("\n"));
  let count = 0;
  for (const date of datesThrough(new Date())) {
    const message = `chore: contribution ${date}`;
    if (existing.has(message)) continue;
    fs.writeFileSync("data.json", JSON.stringify({ date }) + "\n");
    git(["add", "--", "data.json"]);
    const timestamp = `${date}T12:00:00+07:00`;
    git(["commit", "-m", message], {
      env: { ...process.env, GIT_AUTHOR_DATE: timestamp, GIT_COMMITTER_DATE: timestamp },
    });
    count++;
  }
  console.log(`Created ${count} commits. Run git push to publish them.`);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { datesThrough };
