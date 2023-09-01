//Este script é responsável por fazer o loop dos pings que vão aparecendo por baixo do Ping Test

//Array dos IPs a serem pingados
const ipAddresses = ['127.0.0.1', '127.0.0.2', '196.81.1.2', '127.0.0.4', '127.0.0.4'];

//Este é a função que faz o ping aos IPs e retorna o resultado
async function ping(ipAddress) {
  try {
    const response = await fetch(`/ping/${ipAddress}`);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error('Error:', error);
    return 'Error';
  }
}

//Esta função usa a função anterior para percorrer todos os pings do array e fazer o ping de cada um, criando uma div com o IP pingado, 
//o resultado e a cor de acordo com o resultado. No final as divs são limpas e volta-se a repetir o processo.
async function pingAll() {
  const pingResultsContainer = document.getElementById('pingResults');
  if (pingResultsContainer) {
    for (let i = 0; i < ipAddresses.length; i++) {
      const ipAddress = ipAddresses[i];
      const result = await ping(ipAddress);
      
      const resultElement = document.createElement('div');
      resultElement.style.borderBottom = '5px solid black';
      
      const ipAddressElement = document.createElement('h2');
      ipAddressElement.textContent = ipAddress;
      
      const pingResultElement = document.createElement('h2');
      pingResultElement.textContent = result;
      pingResultElement.style.paddingBottom = '10px';
      
      resultElement.appendChild(ipAddressElement);
      resultElement.appendChild(pingResultElement);
      
      pingResultsContainer.appendChild(resultElement);

      if (result !== 'Error') {
        pingResultElement.textContent = result;
        if(result.toLowerCase().includes('nok')){
          resultElement.style.backgroundColor = 'red';
        }else{
          resultElement.style.backgroundColor = 'green';
        }
      } else {
        pingResultElement.textContent = 'Error';
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 5000));

    while (pingResultsContainer.firstChild) {
      pingResultsContainer.removeChild(pingResultsContainer.firstChild);
    }
    
    pingAll(); // Start the loop again
  }else {
    console.error("pingResultsContainer not found.");
  }
  
}

pingAll();

