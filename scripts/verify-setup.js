#!/usr/bin/env node

import fs from "fs/promises"

const REQUIRED_FILES = ["package.json", "next.config.js", "vercel.json", ".gitignore", ".env.example", "tsconfig.json"]

const REQUIRED_DIRS = ["app", ".github/workflows", "scripts"]

const REQUIRED_ENV_VARS = ["GITHUB_USERNAME", "NEXT_PUBLIC_GITHUB_USERNAME"]

async function checkFile(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function checkDirectory(dirPath) {
  try {
    const stats = await fs.stat(dirPath)
    return stats.isDirectory()
  } catch {
    return false
  }
}

async function verifySetup() {
  console.log("🔍 Verifying project setup...\n")

  // Check required files
  console.log("📁 Checking required files:")
  for (const file of REQUIRED_FILES) {
    const exists = await checkFile(file)
    console.log(`  ${exists ? "✅" : "❌"} ${file}`)
  }

  // Check required directories
  console.log("\n📂 Checking required directories:")
  for (const dir of REQUIRED_DIRS) {
    const exists = await checkDirectory(dir)
    console.log(`  ${exists ? "✅" : "❌"} ${dir}`)
  }

  // Check environment variables
  console.log("\n🌍 Checking environment variables:")
  for (const envVar of REQUIRED_ENV_VARS) {
    const value = process.env[envVar]
    if (value) {
      console.log(`  ✅ ${envVar}: ${value}`)
    } else {
      console.log(`  ⚠️ ${envVar}: not configured`)
    }
  }

  // Test GitHub API
  console.log("\n🐙 Testing GitHub API:")
  try {
    const username = process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim"
    const token = process.env.GITHUB_TOKEN

    const headers = {
      "User-Agent": `${username}-portfolio-verify`,
      Accept: "application/vnd.github.v3+json",
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`https://api.github.com/users/${username}`, { headers })

    if (response.ok) {
      const user = await response.json()
      console.log(`  ✅ User found: ${user.name || user.login}`)
      console.log(`  ✅ Public repos: ${user.public_repos}`)
      console.log(`  ✅ Authentication: ${token ? "Token" : "Public"}`)
    } else {
      console.log(`  ❌ API error: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.log(`  ❌ API test failed: ${error.message}`)
  }

  // Check package.json scripts
  console.log("\n📦 Checking package.json scripts:")
  try {
    const packageJson = JSON.parse(await fs.readFile("package.json", "utf8"))
    const requiredScripts = ["dev", "build", "start", "lint"]

    for (const script of requiredScripts) {
      if (packageJson.scripts && packageJson.scripts[script]) {
        console.log(`  ✅ ${script}: ${packageJson.scripts[script]}`)
      } else {
        console.log(`  ❌ ${script}: missing`)
      }
    }
  } catch (error) {
    console.log(`  ❌ Error reading package.json: ${error.message}`)
  }

  console.log("\n✅ Setup verification completed!")
  console.log("\n🎯 Next steps:")
  console.log("1. Configure GitHub repository secrets")
  console.log("2. Enable GitHub Pages in repository settings")
  console.log("3. Configure Vercel project settings")
  console.log("4. Push changes to trigger workflows")
}

verifySetup().catch(console.error)
