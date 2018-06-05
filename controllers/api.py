# Here go your api methods.

#push the url, name, and the element to be tracked into the DB
def choose_element():

	element = request.vars.track_element
	url = request.vars.track_url
	name = request.vars.item_name


	tracker = db.stocklist.insert(
		item = name,
		tracking_url = url,
		tracking_elem = element
	)

	logger.info(tracker)

	return ("OK");



def get_my_items():

	trackedItems = []

	stocks = db(db.stocklist.user_email == auth.user.email).select()

	for item in stocks:
		tracker = dict (
			url = item.tracking_url,
			element = item.tracking_elem,
			name = item.item
		)

		logger.info(tracker)
		trackedItems.append(tracker)

	logger.info("this the list of items you have tracked")
	logger.info(trackedItems);

	return response.json(trackedItems)


from bs4 import BeautifulSoup

def queryHTML():
	soup = BeautifulSoup(request.vars.htmlString, "html.parser")
	result = soup.find(request.vars.element)
	logger.info(result)
