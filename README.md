<p align="center">
<img src="/docs/assets/project_logo.svg">
</p>

# Business Assistant+

A simple company management panel for modern entrepreneurs in the browser. Access it anywhere at any time.

# Table of contents

1. [Features](#Features)
2. [Building](#building)

## Features <a name="Features"></a>

- Friendly **User Interface**
- **Tax Calculator** included
- Follow **currencies and crypto** prices with professional looking charts
- Get motivated by wonderful quotes from one of the best businessmen in the world ( featuring **Elon Musk** )
- Developed in stable and fast Microsoft ASP.NET framework

## Installation <a name="building"></a>

1. Clone this repository

```
  git clone https://github.com/k3yboarders/business-assistant-plus
```

2. Rename the file appsettings - example.json to appsettings.json and enter your database details.
3. Add initial migration

```
dotnet ef migrations add InitialCreate
```

4. Update database

```
dotnet ef database update
```

5. Run dotnet

```
dotnet watch
```

6. You should see your browser opened with the assistant
