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
	if result is None:
		status = "404"
	else:
		status = verify(result)
	return response.json(dict(element=element))

#TODO: verify that the element is the same as the database element
def verify(element):
	logger.info("Verify does nothing right now")
	return "200"

# def find_tag(element):
# 	space_index = element.find(' ')
# 	tag="Error"
# 	tag = element[1:space_index]
# 	if tag.find('>') != -1:
# 		right_carrot_index = tag.find('>')
# 		tag = tag[:right_carrot_index]
# 	logger.info("tag: %s", tag)
# 	return tag

# def find_element_text(element):
# 	start_index = element.find('>')
# 	if start_index != -1:
# 		end_index = element.find('<', start_index+1)
# 		text = element[start_index+1:end_index]
