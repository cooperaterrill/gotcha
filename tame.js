function renderInventory() {
  inventory.innerHTML = "";
  currentItems.forEach((itemName, index) => {
    const itemData = items.find((i) => i.name === itemName);
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.index = index;

    const img = document.createElement("img");
    img.src = itemData.src;
    img.alt = itemName;
    img.draggable = true;

    // Drag start
    img.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", index);
    });

    // Drag over
    slot.addEventListener("dragover", (e) => e.preventDefault());

    // Drop
    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedIndex = e.dataTransfer.getData("text");
      if (draggedIndex === null) return;

      // Swap dragged item with drop target
      [currentItems[draggedIndex], currentItems[index]] = [
        currentItems[index],
        currentItems[draggedIndex],
      ];
      renderInventory();
    });

    slot.appendChild(img);
    inventory.appendChild(slot);
  });
}

renderInventory();
