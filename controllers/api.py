# Here go your api methods.
import json

#push the url, name, and the element to be tracked into the DB
def choose_element():

	# element = request.vars.track_element
	# url = request.vars.track_url
	# name = request.vars.item_name


	# tracker = db.stocklist.insert(
	# 	item = name,
	# 	tracking_url = url,
	# 	tracking_elem = element
	# )

	logger.info(tracker)

	return ("OK");


@auth.requires_signature()
def get_my_items():

	trackedItems = []

	stocks = db(db.stocklist.user_email == auth.user.email).select()

	for item in stocks:
		tracker = dict (
			id=item.id,
			url = item.tracking_url,
			element = item.tracking_elem,
			name = item.item,
			favicon_url = item.favicon_url,
			tag = item.elem_tag,
			className = item.elem_classname,
			elem_id = item.elem_id,
			innerHTML = item.elem_innerHTML
		)
		trackedItems.append(tracker)

	# logger.info("this the list of items you have tracked")
	# logger.info(trackedItems);

	return response.json(dict(list_items=trackedItems))

def add_item():
	s_id = db.stocklist.insert(
		item=request.vars.name,
		tracking_url=request.vars.url,
		tracking_elem=request.vars.elem,
		elem_id=request.vars.elem_id,
		elem_tag=request.vars.elem_tag,
		elem_classname=request.vars.elem_classname,
		elem_innerHTML=request.vars.elem_innerHTML,
		favicon_url=request.vars.favicon_url
		)
	item = db.stocklist(s_id)
	return response.json(dict(item=item))


from bs4 import BeautifulSoup

def queryHTML():
	#element = '<a href="https://computers.woot.com/privacy?ref=w_ft_mj_pp">privacy policy.</a>"'
	element = request.vars.element
	status = ""
	# tag = find_tag(element)
	# text = find_element_text(element)
	soup = BeautifulSoup(request.vars.htmlString, "html.parser")
	result = soup.find(request.vars.tag, id=request.vars.id, text=request.vars.innerHTML)
	logger.info("RESULT \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
	logger.info(result)
	# if result is None:
	# 	status = "404"
	# else:
	# 	status = verify(result)
	return response.json(dict(element=element))

#TODO: verify that the element is the same as the database element
def verify():
	status = ""
	result = None
	logger.info(type(request.vars.item))
	item = json.load(request.vars.item)
	soup = BeautifulSoup(request.vars.htmlString, "html.parser")
	result = soup.find(request.vars.item.tag, id=request.vars.item.elem_id, text=request.vars.innerHTML)
	if result is not None:
		status = "same"
	else:
		status = "changed"
	return status

