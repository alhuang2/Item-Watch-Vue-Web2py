# Here go your api methods.

def choose_element: 

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

