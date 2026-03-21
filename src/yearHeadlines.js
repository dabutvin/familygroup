const PLACEMENTS_BY_YEAR = {
  1939: [
    { text: "World's Fair Opens in New York", top: "5%", left: "3%", rotate: -4, size: 1.5 },
    { text: "Germany Invades Poland", top: "22%", left: "52%", rotate: 7, size: 2.0 },
    { text: "Gone With the Wind Premieres", top: "58%", left: "8%", rotate: -9, size: 1.1 },
    { text: "Lou Gehrig Bids Farewell", top: "72%", left: "42%", rotate: 3, size: 1.3 },
  ],
  1940: [
    { text: "Roosevelt Wins Third Term", top: "10%", left: "40%", rotate: -7, size: 1.8 },
    { text: "Blitz Rains Fire on London", top: "35%", left: "1%", rotate: 5, size: 1.2 },
    { text: "Selective Service Act Signed", top: "60%", left: "30%", rotate: -2, size: 1.5 },
    { text: "Fantasia Opens in Theaters", top: "5%", left: "5%", rotate: 11, size: 0.9 },
    { text: "Hemingway Publishes Bell Tolls", top: "78%", left: "50%", rotate: -6, size: 1.0 },
    { text: "Census Counts 132 Million", top: "48%", left: "60%", rotate: 8, size: 1.4 },
  ],
  1941: [
    { text: "Pearl Harbor Attacked", top: "12%", left: "25%", rotate: -3, size: 2.4 },
    { text: "United States Enters the War", top: "55%", left: "5%", rotate: 6, size: 1.6 },
    { text: "Lend-Lease Act Signed", top: "75%", left: "48%", rotate: -8, size: 1.1 },
  ],
  1942: [
    { text: "US Fleet Routs Japanese Navy at Midway", top: "8%", left: "12%", rotate: -3, size: 1.7 },
    { text: "Allied Forces Land on North African Coast", top: "32%", left: "40%", rotate: 5, size: 1.1 },
    { text: "Casablanca Premieres in Hollywood and New York", top: "52%", left: "2%", rotate: -5, size: 0.98 },
    { text: "Gas Rationing Begins Across the Nation", top: "72%", left: "34%", rotate: 4, size: 1.05 },
  ],
  1943: [
    { text: "Allies Invade Sicily", top: "8%", left: "48%", rotate: -6, size: 1.85 },
    { text: "Mussolini Overthrown", top: "30%", left: "4%", rotate: 8, size: 1.25 },
    { text: "Allies Bomb Hamburg", top: "52%", left: "40%", rotate: 3, size: 1.45 },
    { text: "Race Riots Erupt in Detroit", top: "72%", left: "10%", rotate: -5, size: 1.1 },
  ],
  1944: [
    { text: "Allied Forces Storm Normandy", top: "8%", left: "15%", rotate: -5, size: 2.2 },
    { text: "Paris Liberated", top: "45%", left: "55%", rotate: 8, size: 1.8 },
    { text: "GI Bill Signed Into Law", top: "70%", left: "8%", rotate: -3, size: 1.1 },
    { text: "Smokey Bear Campaign Begins", top: "30%", left: "2%", rotate: 6, size: 0.95 },
  ],
  1945: [
    { text: "Victory in Europe!", top: "8%", left: "6%", rotate: -4, size: 2.35 },
    { text: "FDR Dies in Office", top: "28%", left: "58%", rotate: 5, size: 1.55 },
    { text: "Atomic Bomb Dropped on Hiroshima", top: "50%", left: "3%", rotate: -3, size: 1.15 },
    { text: "United Nations Charter Signed", top: "72%", left: "52%", rotate: -6, size: 1.2 },
  ],
  1946: [
    { text: "United Nations Holds First Session", top: "10%", left: "20%", rotate: 4, size: 1.6 },
    { text: "Baby Boom Sweeps the Nation", top: "42%", left: "50%", rotate: -9, size: 1.3 },
    { text: "Nuremberg Verdicts Delivered", top: "70%", left: "5%", rotate: 6, size: 1.8 },
    { text: "It's a Wonderful Life Opens", top: "28%", left: "2%", rotate: -3, size: 1.0 },
    { text: "ENIAC Computer Unveiled", top: "75%", left: "55%", rotate: 11, size: 0.9 },
  ],
  1947: [
    { text: "Jackie Robinson Breaks Color Barrier", top: "8%", left: "8%", rotate: -6, size: 2.1 },
    { text: "Marshall Plan Announced", top: "50%", left: "45%", rotate: 5, size: 1.4 },
    { text: "Dead Sea Scrolls Discovered", top: "30%", left: "55%", rotate: -10, size: 1.0 },
    { text: "India Gains Independence", top: "68%", left: "10%", rotate: 8, size: 1.6 },
  ],
  1948: [
    { text: "State of Israel Proclaimed", top: "8%", left: "6%", rotate: -5, size: 2.2 },
    { text: "Truman Wins in Stunning Upset", top: "30%", left: "48%", rotate: 7, size: 1.45 },
    { text: "Berlin Airlift Begins", top: "52%", left: "4%", rotate: -7, size: 1.65 },
    { text: "NHS Founded in Britain", top: "72%", left: "44%", rotate: 4, size: 1.0 },
  ],
};

export function getYearHeadlines(year) {
  const rows = PLACEMENTS_BY_YEAR[year] || [];
  return rows.map((h) => ({
    text: h.text,
    style: {
      top: h.top,
      left: h.left,
      transform: `rotate(${h.rotate}deg)`,
      fontSize: `${h.size}rem`,
    },
  }));
}
