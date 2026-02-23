 export function formateDate(d) {
    const date = new Date(d);

    const formatted = date
      .toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
      .toLowerCase();

    return formatted;
  }