<p align="center">
  <img src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/96/external-readme-is-a-easy-to-build-a-developer-hub-that-adapts-to-the-user-logo-regular-tal-revivo.png" width="100" />
</p>
<p align="center">
    <h1 align="center">HR-MANAGEMENT-SYSTEM</h1>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/FaisalMisbah23/HR-Management-System?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/FaisalMisbah23/HR-Management-System?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/FaisalMisbah23/HR-Management-System?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/FaisalMisbah23/HR-Management-System?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" alt="Prettier">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
	<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" alt="Autoprefixer">
	<img src="https://img.shields.io/badge/Webpack-8DD6F9.svg?style=flat&logo=Webpack&logoColor=black" alt="Webpack">
	<br>
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

## 🔗 Quick Links

> - [📍 Overview](#-overview)
> - [📂 Repository Structure](#-repository-structure)
> - [🧩 Modules](#-modules)
> - [🚀 Getting Started](#-getting-started)
>   - [⚙️ Installation](#️-installation)
>   - [🤖 Running HR-Management-System](#-running-HR-Management-System)
>   - [🧪 Tests](#-tests)
> - [🤝 Contributing](#-contributing)

---

## 📍 Overview

<code>The Human Resource Management System, built with the MERN Stack, features an Admin Dashboard for HR operations like Employee Management, Leave Management, and Performance Management with real-time notifications. The Employee Dashboard allows employees to receive targets and updates, apply for leave, view targets, and get real-time notifications.</code>

---

## 📂 Repository Structure

```sh
└── HR-Management-System/
    ├── LICENSE.md
    ├── README.md
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.cjs
    ├── public
    │   ├── data.json
    │   └── favicon.ico
    ├── src
    │   ├── App.tsx
    │   ├── ProtectedRoute.tsx
    │   ├── UserComponents
    │   │   ├── Navbar.tsx
    │   │   └── UserProtectedRoutes.tsx
    │   ├── common
    │   │   └── Loader
    │   │       └── index.tsx
    │   ├── components
    │   │   ├── Breadcrumbs
    │   │   │   └── Breadcrumb.tsx
    │   │   ├── CardDataStats.tsx
    │   │   ├── Charts
    │   │   │   ├── ChartOne.tsx
    │   │   │   ├── ChartThree.tsx
    │   │   │   └── ChartTwo.tsx
    │   │   ├── Chat
    │   │   │   └── ChatCard.tsx
    │   │   ├── Checkboxes
    │   │   │   ├── CheckboxFive.tsx
    │   │   │   ├── CheckboxFour.tsx
    │   │   │   ├── CheckboxOne.tsx
    │   │   │   ├── CheckboxThree.tsx
    │   │   │   └── CheckboxTwo.tsx
    │   │   ├── Dropdowns
    │   │   │   └── DropdownDefault.tsx
    │   │   ├── ErrorPage.tsx
    │   │   ├── Forms
    │   │   │   ├── DatePicker
    │   │   │   │   ├── DatePickerOne.tsx
    │   │   │   │   └── DatePickerTwo.tsx
    │   │   │   ├── MultiSelect.tsx
    │   │   │   └── SelectGroup
    │   │   │       ├── SelectGroupOne.tsx
    │   │   │       └── SelectGroupTwo.tsx
    │   │   ├── Header
    │   │   │   ├── DarkModeSwitcher.tsx
    │   │   │   ├── DropdownMessage.tsx
    │   │   │   ├── DropdownNotification.tsx
    │   │   │   ├── DropdownUser.tsx
    │   │   │   └── index.tsx
    │   │   ├── LandingPage.tsx
    │   │   ├── Maps
    │   │   │   └── MapOne.tsx
    │   │   ├── ModalSettings.tsx
    │   │   ├── PageTitle.tsx
    │   │   ├── Sidebar
    │   │   │   ├── SidebarLinkGroup.tsx
    │   │   │   └── index.tsx
    │   │   ├── Switchers
    │   │   │   ├── SwitcherFour.tsx
    │   │   │   ├── SwitcherOne.tsx
    │   │   │   ├── SwitcherThree.tsx
    │   │   │   └── SwitcherTwo.tsx
    │   │   ├── TableSettings.tsx
    │   │   └── Tables
    │   │       ├── TableFive.tsx
    │   │       ├── TableFour.tsx
    │   │       ├── TableOne.tsx
    │   │       ├── TableThree.tsx
    │   │       └── TableTwo.tsx
    │   ├── css
    │   │   ├── satoshi.css
    │   │   └── style.css
    │   ├── features
    │   │   ├── adminGetAllEmpLeaves.ts
    │   │   ├── companySlice.ts
    │   │   ├── currentEmpSlice.ts
    │   │   ├── employeeSlice.ts
    │   │   ├── getAllLeaves.ts
    │   │   ├── getCompEmpSlice.ts
    │   │   ├── getCurrHrSlice.ts
    │   │   └── getLeaveTypes.ts
    │   ├── fonts
    │   │   ├── Satoshi-Black.eot
    │   │   ├── Satoshi-Black.ttf
    │   │   ├── Satoshi-Black.woff
    │   │   ├── Satoshi-Black.woff2
    │   │   ├── Satoshi-BlackItalic.eot
    │   │   ├── Satoshi-BlackItalic.ttf
    │   │   ├── Satoshi-BlackItalic.woff
    │   │   ├── Satoshi-BlackItalic.woff2
    │   │   ├── Satoshi-Bold.eot
    │   │   ├── Satoshi-Bold.ttf
    │   │   ├── Satoshi-Bold.woff
    │   │   ├── Satoshi-Bold.woff2
    │   │   ├── Satoshi-BoldItalic.eot
    │   │   ├── Satoshi-BoldItalic.ttf
    │   │   ├── Satoshi-BoldItalic.woff
    │   │   ├── Satoshi-BoldItalic.woff2
    │   │   ├── Satoshi-Italic.eot
    │   │   ├── Satoshi-Italic.ttf
    │   │   ├── Satoshi-Italic.woff
    │   │   ├── Satoshi-Italic.woff2
    │   │   ├── Satoshi-Light.eot
    │   │   ├── Satoshi-Light.ttf
    │   │   ├── Satoshi-Light.woff
    │   │   ├── Satoshi-Light.woff2
    │   │   ├── Satoshi-LightItalic.eot
    │   │   ├── Satoshi-LightItalic.ttf
    │   │   ├── Satoshi-LightItalic.woff
    │   │   ├── Satoshi-LightItalic.woff2
    │   │   ├── Satoshi-Medium.eot
    │   │   ├── Satoshi-Medium.ttf
    │   │   ├── Satoshi-Medium.woff
    │   │   ├── Satoshi-Medium.woff2
    │   │   ├── Satoshi-MediumItalic.eot
    │   │   ├── Satoshi-MediumItalic.ttf
    │   │   ├── Satoshi-MediumItalic.woff
    │   │   ├── Satoshi-MediumItalic.woff2
    │   │   ├── Satoshi-Regular.eot
    │   │   ├── Satoshi-Regular.ttf
    │   │   ├── Satoshi-Regular.woff
    │   │   ├── Satoshi-Regular.woff2
    │   │   ├── Satoshi-Variable.eot
    │   │   ├── Satoshi-Variable.ttf
    │   │   ├── Satoshi-Variable.woff
    │   │   ├── Satoshi-Variable.woff2
    │   │   ├── Satoshi-VariableItalic.eot
    │   │   ├── Satoshi-VariableItalic.ttf
    │   │   ├── Satoshi-VariableItalic.woff
    │   │   └── Satoshi-VariableItalic.woff2
    │   ├── hooks
    │   │   ├── fireToast.tsx
    │   │   ├── useColorMode.tsx
    │   │   └── useLocalStorage.tsx
    │   ├── images
    │   │   ├── about.txt
    │   │   ├── android-chrome-192x192.png
    │   │   ├── android-chrome-512x512.png
    │   │   ├── apple-touch-icon.png
    │   │   ├── brand
    │   │   │   ├── brand-01.svg
    │   │   │   ├── brand-02.svg
    │   │   │   ├── brand-03.svg
    │   │   │   ├── brand-04.svg
    │   │   │   └── brand-05.svg
    │   │   ├── cards
    │   │   │   ├── cards-01.png
    │   │   │   ├── cards-02.png
    │   │   │   ├── cards-03.png
    │   │   │   ├── cards-04.png
    │   │   │   ├── cards-05.png
    │   │   │   └── cards-06.png
    │   │   ├── country
    │   │   │   ├── country-01.svg
    │   │   │   ├── country-02.svg
    │   │   │   ├── country-03.svg
    │   │   │   ├── country-04.svg
    │   │   │   ├── country-05.svg
    │   │   │   └── country-06.svg
    │   │   ├── cover
    │   │   │   └── cover-01.png
    │   │   ├── favicon-16x16.png
    │   │   ├── favicon-32x32.png
    │   │   ├── favicon.ico
    │   │   ├── icon
    │   │   │   ├── icon-arrow-down.svg
    │   │   │   ├── icon-calendar.svg
    │   │   │   ├── icon-copy-alt.svg
    │   │   │   ├── icon-moon.svg
    │   │   │   └── icon-sun.svg
    │   │   ├── logo
    │   │   │   ├── loginImage.png
    │   │   │   ├── logo-dark.svg
    │   │   │   ├── logo-icon.svg
    │   │   │   ├── logo.png
    │   │   │   ├── logo.svg
    │   │   │   ├── logoLight.png
    │   │   │   ├── userLoginImg.png
    │   │   │   └── userRegisterImg.png
    │   │   ├── product
    │   │   │   ├── product-01.png
    │   │   │   ├── product-02.png
    │   │   │   ├── product-03.png
    │   │   │   ├── product-04.png
    │   │   │   └── product-thumb.png
    │   │   ├── site.webmanifest
    │   │   ├── task
    │   │   │   └── task-01.jpg
    │   │   └── user
    │   │       ├── user-01.png
    │   │       ├── user-02.png
    │   │       ├── user-03.png
    │   │       ├── user-04.png
    │   │       ├── user-05.png
    │   │       ├── user-06.png
    │   │       ├── user-07.png
    │   │       ├── user-08.png
    │   │       ├── user-09.png
    │   │       ├── user-10.png
    │   │       ├── user-11.png
    │   │       ├── user-12.png
    │   │       ├── user-13.png
    │   │       └── user-14.png
    │   ├── js
    │   │   └── us-aea-en.js
    │   ├── jsvectormap.d.ts
    │   ├── layout
    │   │   └── DefaultLayout.tsx
    │   ├── lib.d.ts
    │   ├── main.tsx
    │   ├── pages
    │   │   ├── Admin
    │   │   │   └── Company.tsx
    │   │   ├── Authentication
    │   │   │   ├── SignIn.tsx
    │   │   │   └── SignUp.tsx
    │   │   ├── Calendar.tsx
    │   │   ├── Chart.tsx
    │   │   ├── Dashboard
    │   │   │   └── ECommerce.tsx
    │   │   ├── EmployeeManagement
    │   │   │   ├── EmployeeManagement.tsx
    │   │   │   └── UpdateProfile.tsx
    │   │   ├── Form
    │   │   │   ├── FormElements.tsx
    │   │   │   └── FormLayout.tsx
    │   │   ├── LeaveManagement
    │   │   │   ├── LeaveHistory.tsx
    │   │   │   ├── LeaveRecall.tsx
    │   │   │   └── LeaveSettings.tsx
    │   │   ├── PerformanceManagement
    │   │   │   ├── EditTarget.tsx
    │   │   │   ├── Target.tsx
    │   │   │   └── TargetSetup.tsx
    │   │   ├── Profile.tsx
    │   │   ├── Settings.tsx
    │   │   ├── Tables.tsx
    │   │   ├── UiElements
    │   │   │   ├── Alerts.tsx
    │   │   │   └── Buttons.tsx
    │   │   └── User
    │   │       ├── LeaveForm.tsx
    │   │       ├── UserDashboard.tsx
    │   │       ├── UserKpiGoals.tsx
    │   │       ├── UserLeaveHistroy.tsx
    │   │       ├── UserNotifications.tsx
    │   │       ├── UserProfile.tsx
    │   │       ├── UserSetting.tsx
    │   │       ├── UserSignIn.tsx
    │   │       ├── UserSignup.tsx
    │   │       └── UserUpdateProfile.tsx
    │   ├── react-app-env.d.ts
    │   ├── store.ts
    │   └── types
    │       ├── brand.ts
    │       ├── chat.ts
    │       ├── package.ts
    │       └── product.ts
    ├── tailwind.config.cjs
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vercel.json
    └── vite.config.js
```

---

## 🧩 Modules

<details closed><summary>.</summary>

| File                                                                                                          | Summary                         |
| ---                                                                                                           | ---                             |
| [tsconfig.json](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/tsconfig.json)             | <code>► INSERT-TEXT-HERE</code> |
| [index.html](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/index.html)                   | <code>► INSERT-TEXT-HERE</code> |
| [vite.config.js](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/vite.config.js)           | <code>► INSERT-TEXT-HERE</code> |
| [package.json](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/package.json)               | <code>► INSERT-TEXT-HERE</code> |
| [tailwind.config.cjs](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/tailwind.config.cjs) | <code>► INSERT-TEXT-HERE</code> |
| [postcss.config.cjs](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/postcss.config.cjs)   | <code>► INSERT-TEXT-HERE</code> |
| [tsconfig.node.json](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/tsconfig.node.json)   | <code>► INSERT-TEXT-HERE</code> |
| [package-lock.json](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/package-lock.json)     | <code>► INSERT-TEXT-HERE</code> |
| [vercel.json](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/vercel.json)                 | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>public</summary>

| File                                                                                             | Summary                         |
| ---                                                                                              | ---                             |
| [data.json](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/public/data.json) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src</summary>

| File                                                                                                            | Summary                         |
| ---                                                                                                             | ---                             |
| [react-app-env.d.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/react-app-env.d.ts) | <code>► INSERT-TEXT-HERE</code> |
| [store.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/store.ts)                     | <code>► INSERT-TEXT-HERE</code> |
| [lib.d.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/lib.d.ts)                     | <code>► INSERT-TEXT-HERE</code> |
| [main.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/main.tsx)                     | <code>► INSERT-TEXT-HERE</code> |
| [ProtectedRoute.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/ProtectedRoute.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [jsvectormap.d.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/jsvectormap.d.ts)     | <code>► INSERT-TEXT-HERE</code> |
| [App.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/App.tsx)                       | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.css</summary>

| File                                                                                                  | Summary                         |
| ---                                                                                                   | ---                             |
| [style.css](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/css/style.css)     | <code>► INSERT-TEXT-HERE</code> |
| [satoshi.css](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/css/satoshi.css) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.layout</summary>

| File                                                                                                                 | Summary                         |
| ---                                                                                                                  | ---                             |
| [DefaultLayout.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/layout/DefaultLayout.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.types</summary>

| File                                                                                                  | Summary                         |
| ---                                                                                                   | ---                             |
| [package.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/types/package.ts) | <code>► INSERT-TEXT-HERE</code> |
| [product.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/types/product.ts) | <code>► INSERT-TEXT-HERE</code> |
| [brand.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/types/brand.ts)     | <code>► INSERT-TEXT-HERE</code> |
| [chat.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/types/chat.ts)       | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.pages</summary>

| File                                                                                                      | Summary                         |
| ---                                                                                                       | ---                             |
| [Chart.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/Chart.tsx)       | <code>► INSERT-TEXT-HERE</code> |
| [Tables.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/Tables.tsx)     | <code>► INSERT-TEXT-HERE</code> |
| [Profile.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/Profile.tsx)   | <code>► INSERT-TEXT-HERE</code> |
| [Calendar.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/Calendar.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [Settings.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/Settings.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.pages.User</summary>

| File                                                                                                                             | Summary                         |
| ---                                                                                                                              | ---                             |
| [UserSetting.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/User/UserSetting.tsx)             | <code>► INSERT-TEXT-HERE</code> |
| [UserNotifications.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/User/UserNotifications.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [UserUpdateProfile.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/User/UserUpdateProfile.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [UserLeaveHistroy.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/User/UserLeaveHistroy.tsx)   | <code>► INSERT-TEXT-HERE</code> |
| [UserSignup.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/User/UserSignup.tsx)               | <code>► INSERT-TEXT-HERE</code> |
| [UserDashboard.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/User/UserDashboard.tsx)         | <code>► INSERT-TEXT-HERE</code> |
| [LeaveForm.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/User/LeaveForm.tsx)                 | <code>► INSERT-TEXT-HERE</code> |
| [UserSignIn.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/User/UserSignIn.tsx)               | <code>► INSERT-TEXT-HERE</code> |
| [UserKpiGoals.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/User/UserKpiGoals.tsx)           | <code>► INSERT-TEXT-HERE</code> |
| [UserProfile.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/User/UserProfile.tsx)             | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.pages.Admin</summary>

| File                                                                                                          | Summary                         |
| ---                                                                                                           | ---                             |
| [Company.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/Admin/Company.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.pages.Authentication</summary>

| File                                                                                                                 | Summary                         |
| ---                                                                                                                  | ---                             |
| [SignUp.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/Authentication/SignUp.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [SignIn.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/Authentication/SignIn.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.pages.Dashboard</summary>

| File                                                                                                                  | Summary                         |
| ---                                                                                                                   | ---                             |
| [ECommerce.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/Dashboard/ECommerce.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.pages.UiElements</summary>

| File                                                                                                               | Summary                         |
| ---                                                                                                                | ---                             |
| [Alerts.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/UiElements/Alerts.tsx)   | <code>► INSERT-TEXT-HERE</code> |
| [Buttons.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/UiElements/Buttons.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.pages.PerformanceManagement</summary>

| File                                                                                                                                  | Summary                         |
| ---                                                                                                                                   | ---                             |
| [EditTarget.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/PerformanceManagement/EditTarget.tsx)   | <code>► INSERT-TEXT-HERE</code> |
| [TargetSetup.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/PerformanceManagement/TargetSetup.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [Target.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/PerformanceManagement/Target.tsx)           | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.pages.EmployeeManagement</summary>

| File                                                                                                                                             | Summary                         |
| ---                                                                                                                                              | ---                             |
| [UpdateProfile.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/EmployeeManagement/UpdateProfile.tsx)           | <code>► INSERT-TEXT-HERE</code> |
| [EmployeeManagement.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/EmployeeManagement/EmployeeManagement.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.pages.Form</summary>

| File                                                                                                                   | Summary                         |
| ---                                                                                                                    | ---                             |
| [FormLayout.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/Form/FormLayout.tsx)     | <code>► INSERT-TEXT-HERE</code> |
| [FormElements.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/Form/FormElements.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.pages.LeaveManagement</summary>

| File                                                                                                                                | Summary                         |
| ---                                                                                                                                 | ---                             |
| [LeaveHistory.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/LeaveManagement/LeaveHistory.tsx)   | <code>► INSERT-TEXT-HERE</code> |
| [LeaveRecall.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/LeaveManagement/LeaveRecall.tsx)     | <code>► INSERT-TEXT-HERE</code> |
| [LeaveSettings.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/pages/LeaveManagement/LeaveSettings.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.UserComponents</summary>

| File                                                                                                                                     | Summary                         |
| ---                                                                                                                                      | ---                             |
| [UserProtectedRoutes.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/UserComponents/UserProtectedRoutes.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [Navbar.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/UserComponents/Navbar.tsx)                           | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components</summary>

| File                                                                                                                     | Summary                         |
| ---                                                                                                                      | ---                             |
| [CardDataStats.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/CardDataStats.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [ModalSettings.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/ModalSettings.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [ErrorPage.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/ErrorPage.tsx)         | <code>► INSERT-TEXT-HERE</code> |
| [TableSettings.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/TableSettings.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [PageTitle.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/PageTitle.tsx)         | <code>► INSERT-TEXT-HERE</code> |
| [LandingPage.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/LandingPage.tsx)     | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components.Breadcrumbs</summary>

| File                                                                                                                           | Summary                         |
| ---                                                                                                                            | ---                             |
| [Breadcrumb.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Breadcrumbs/Breadcrumb.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components.Chat</summary>

| File                                                                                                                | Summary                         |
| ---                                                                                                                 | ---                             |
| [ChatCard.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Chat/ChatCard.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components.Charts</summary>

| File                                                                                                                      | Summary                         |
| ---                                                                                                                       | ---                             |
| [ChartOne.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Charts/ChartOne.tsx)     | <code>► INSERT-TEXT-HERE</code> |
| [ChartThree.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Charts/ChartThree.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [ChartTwo.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Charts/ChartTwo.tsx)     | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components.Forms</summary>

| File                                                                                                                       | Summary                         |
| ---                                                                                                                        | ---                             |
| [MultiSelect.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Forms/MultiSelect.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components.Forms.SelectGroup</summary>

| File                                                                                                                                         | Summary                         |
| ---                                                                                                                                          | ---                             |
| [SelectGroupOne.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Forms/SelectGroup/SelectGroupOne.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [SelectGroupTwo.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Forms/SelectGroup/SelectGroupTwo.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components.Forms.DatePicker</summary>

| File                                                                                                                                      | Summary                         |
| ---                                                                                                                                       | ---                             |
| [DatePickerOne.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Forms/DatePicker/DatePickerOne.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [DatePickerTwo.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Forms/DatePicker/DatePickerTwo.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components.Switchers</summary>

| File                                                                                                                               | Summary                         |
| ---                                                                                                                                | ---                             |
| [SwitcherFour.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Switchers/SwitcherFour.tsx)   | <code>► INSERT-TEXT-HERE</code> |
| [SwitcherThree.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Switchers/SwitcherThree.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [SwitcherTwo.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Switchers/SwitcherTwo.tsx)     | <code>► INSERT-TEXT-HERE</code> |
| [SwitcherOne.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Switchers/SwitcherOne.tsx)     | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components.Header</summary>

| File                                                                                                                                          | Summary                         |
| ---                                                                                                                                           | ---                             |
| [DropdownMessage.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Header/DropdownMessage.tsx)           | <code>► INSERT-TEXT-HERE</code> |
| [index.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Header/index.tsx)                               | <code>► INSERT-TEXT-HERE</code> |
| [DarkModeSwitcher.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Header/DarkModeSwitcher.tsx)         | <code>► INSERT-TEXT-HERE</code> |
| [DropdownUser.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Header/DropdownUser.tsx)                 | <code>► INSERT-TEXT-HERE</code> |
| [DropdownNotification.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Header/DropdownNotification.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components.Checkboxes</summary>

| File                                                                                                                                | Summary                         |
| ---                                                                                                                                 | ---                             |
| [CheckboxThree.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Checkboxes/CheckboxThree.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [CheckboxFour.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Checkboxes/CheckboxFour.tsx)   | <code>► INSERT-TEXT-HERE</code> |
| [CheckboxOne.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Checkboxes/CheckboxOne.tsx)     | <code>► INSERT-TEXT-HERE</code> |
| [CheckboxFive.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Checkboxes/CheckboxFive.tsx)   | <code>► INSERT-TEXT-HERE</code> |
| [CheckboxTwo.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Checkboxes/CheckboxTwo.tsx)     | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components.Maps</summary>

| File                                                                                                            | Summary                         |
| ---                                                                                                             | ---                             |
| [MapOne.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Maps/MapOne.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components.Sidebar</summary>

| File                                                                                                                                   | Summary                         |
| ---                                                                                                                                    | ---                             |
| [index.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Sidebar/index.tsx)                       | <code>► INSERT-TEXT-HERE</code> |
| [SidebarLinkGroup.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Sidebar/SidebarLinkGroup.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components.Tables</summary>

| File                                                                                                                      | Summary                         |
| ---                                                                                                                       | ---                             |
| [TableFive.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Tables/TableFive.tsx)   | <code>► INSERT-TEXT-HERE</code> |
| [TableThree.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Tables/TableThree.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [TableOne.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Tables/TableOne.tsx)     | <code>► INSERT-TEXT-HERE</code> |
| [TableTwo.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Tables/TableTwo.tsx)     | <code>► INSERT-TEXT-HERE</code> |
| [TableFour.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Tables/TableFour.tsx)   | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.components.Dropdowns</summary>

| File                                                                                                                                   | Summary                         |
| ---                                                                                                                                    | ---                             |
| [DropdownDefault.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/components/Dropdowns/DropdownDefault.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.features</summary>

| File                                                                                                                               | Summary                         |
| ---                                                                                                                                | ---                             |
| [adminGetAllEmpLeaves.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/features/adminGetAllEmpLeaves.ts) | <code>► INSERT-TEXT-HERE</code> |
| [employeeSlice.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/features/employeeSlice.ts)               | <code>► INSERT-TEXT-HERE</code> |
| [companySlice.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/features/companySlice.ts)                 | <code>► INSERT-TEXT-HERE</code> |
| [getAllLeaves.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/features/getAllLeaves.ts)                 | <code>► INSERT-TEXT-HERE</code> |
| [getCurrHrSlice.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/features/getCurrHrSlice.ts)             | <code>► INSERT-TEXT-HERE</code> |
| [getCompEmpSlice.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/features/getCompEmpSlice.ts)           | <code>► INSERT-TEXT-HERE</code> |
| [getLeaveTypes.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/features/getLeaveTypes.ts)               | <code>► INSERT-TEXT-HERE</code> |
| [currentEmpSlice.ts](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/features/currentEmpSlice.ts)           | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.images</summary>

| File                                                                                                               | Summary                         |
| ---                                                                                                                | ---                             |
| [about.txt](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/images/about.txt)               | <code>► INSERT-TEXT-HERE</code> |
| [site.webmanifest](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/images/site.webmanifest) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.common.Loader</summary>

| File                                                                                                        | Summary                         |
| ---                                                                                                         | ---                             |
| [index.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/common/Loader/index.tsx) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.hooks</summary>

| File                                                                                                                    | Summary                         |
| ---                                                                                                                     | ---                             |
| [useColorMode.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/hooks/useColorMode.tsx)       | <code>► INSERT-TEXT-HERE</code> |
| [useLocalStorage.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/hooks/useLocalStorage.tsx) | <code>► INSERT-TEXT-HERE</code> |
| [fireToast.tsx](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/hooks/fireToast.tsx)             | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.js</summary>

| File                                                                                                   | Summary                         |
| ---                                                                                                    | ---                             |
| [us-aea-en.js](https://github.com/FaisalMisbah23/HR-Management-System/blob/master/src/js/us-aea-en.js) | <code>► INSERT-TEXT-HERE</code> |

</details>

---

## 🚀 Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **TypeScript**: `version 5.5.`

### ⚙️ Installation

1. Clone the HR-Management-System repository:

```sh
git clone https://github.com/FaisalMisbah23/HR-Management-System
```

2. Change to the project directory:

```sh
cd HR-Management-System
```

3. Install the dependencies:

```sh
npm install
```

### 🤖 Running HR-Management-System

Use the following command to run HR-Management-System:

```sh
npm run build && node dist/main.js
```

### 🧪 Tests

To execute tests, run:

```sh
npm test
```

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/FaisalMisbah23/HR-Management-System/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/FaisalMisbah23/HR-Management-System/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/FaisalMisbah23/HR-Management-System/issues)**: Submit bugs found or log feature requests for Hr-management-system.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/FaisalMisbah23/HR-Management-System
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>


[**Return**](#-quick-links)

---
