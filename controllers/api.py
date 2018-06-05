# Here go your api methods.

from bs4 import BeautifulSoup

def queryHTML():
	soup = BeautifulSoup(request.vars.htmlString, "html.parser")
	result = soup.find(request.vars.element)
	logger.info(result)
	