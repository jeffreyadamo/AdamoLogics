const ugmL = 0;
const molW = 0;
const nanoMolar = 0;

const ugmL_to_nanoMolar = (ugmL, molW) => {
  const nanoMolar = (ugmL/molW)*1000;
  console.log(nanoMolar + " [M]");
  return nanoMolar;
}

const nanoMolar_to_ugmL = (nanoMolar, molW) => {
  const ugmL = (nanoMolar*molW)/1000;
  console.log(ugmL + " ug/mL");
}

ugmL_to_nanoMolar(3, 150);
nanoMolar_to_ugmL(200, 168.014);