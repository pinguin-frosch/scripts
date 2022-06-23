// Eliminar todos los paneles
let all_panels = panels()
for (let panel of all_panels) {
    panel.remove()
}

// Eliminar todos los widgets
let all_desktops = desktops()
for (let desktop of all_desktops) {
    let all_widgets = desktop.widgets()
    for (let widget of all_widgets) {
        widget.remove()
    }
}

// Añadir el widget de la bandeja de sistema
for (let desktop of all_desktops) {
    let widget = desktop.addWidget("org.kde.plasma.systemtray", 0, 1000, 550, 80)
    let systemtray_id = widget.readConfig("SystrayContainmentId")
    const systray = desktopById(systemtray_id)
    systray.currentConfigGroup = ["General"]
    systray.writeConfig("showAllItems", true)
    systray.reloadConfig()
}

// Añadir el widget de la hora y fecha
for (let desktop of all_desktops) {
    let reloj = desktop.addWidget("org.kde.plasma.digitalclock", 1616, 1000, 304, 80)
    reloj.writeConfig("UserBackgroundHints", "StandardBackground")
    reloj.currentConfigGroup = ["Appearance"]
    reloj.writeConfig("showSeconds", true)
    reloj.writeConfig("dateDisplayFormat", "BesideTime")
    reloj.writeConfig("showWeekNumbers", true)
}
