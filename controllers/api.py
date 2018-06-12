# Here go your api methods.
import json, urllib


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
			innerHTML = item.elem_innerHTML,
			tracking_elem = item.tracking_elem,
			in_stock = item.in_stock
		)
		trackedItems.append(tracker)

	# logger.info("this the list of items you have tracked")
	# logger.info(trackedItems);

	return response.json(dict(list_items=trackedItems))

def add_item():

	logger.info(request.vars.elem_className)

	s_id = db.stocklist.insert(
		item=request.vars.name,
		tracking_url=request.vars.url,
		tracking_elem=request.vars.elem,
		elem_id=request.vars.elem_id,
		elem_tag=request.vars.elem_tag,
		elem_classname=request.vars.elem_className,
		elem_innerHTML=request.vars.elem_innerHTML,
		favicon_url=request.vars.favicon_url,
		)
	item = db.stocklist(s_id)

	# import urllib2
	# response = urllib.urlopen(request.vars.url)
	# htmlString = response.read()
	# query = "In Stock."
	# found = htmlString.find(query)


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




	import urllib2, re
	response = urllib.urlopen(request.vars.url)
	htmlString = response.read();

	# query = "Unavailable."

	# found = htmlString.find(query);

	query = request.vars.innerHTML
	# query = '(.)*' + request.vars.innerHTML + '$'
	logger.info(query)

	# query = "In Stock."
	# query = "In Stock.$"
	# found = re.search(query, htmlString)
	found = htmlString.find(query)

	logger.info("found\n\n\n\n\n\n\n")
	logger.info(found)
	logger.info(request.vars.innerHTML)
	# logger.info(request.vars)

	status = ""
	result = None
	# soup = BeautifulSoup(request.vars.htmlString, "html.parser")
	soup = BeautifulSoup(htmlString, "html.parser")
	result = soup.find(request.vars.tag, id=request.vars.elem_id, text=request.vars.innerText)
	logger.info("RESULT \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
	logger.info(result)
	# logger.info(request.vars.elem_id)
	# logger.info("Tracking elem \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
	logger.info(request.vars.tracking_elem)
	logger.info(result == request.vars.tracking_elem)
	# logger.info('<b><div style="display:block;text-align:left"><br/></div>How to graph Sines and Cosines</b>' == '<b><div style="display:block;text-align:left"><br></div>How to graph Sines and Cosines</b>')
	logger.info("found: \n\n\n\n\n\n")
	logger.info(found)
	# if result == None:
	# 	status = "changed"
	# 	return status
	# if result == request.vars.tracking_elem:
	# 	status = "same"
	# else:
	# 	status = "changed"

	item = db( (db.stocklist.tracking_url == request.vars.url) & (db.stocklist.user_email == auth.user.email) ).select().first()



	if found == -1:
		status = False 
		item.update_record(in_stock = False)
		return status
	else:
		status = True 
		item.update_record(in_stock = True)
		return status


	# found = False
	# for string in soup.stripped_strings:
	# 	logger.info("string in soup\n\n")
	# 	logger.info(repr(string))
	# 	if repr(string) == request.vars.innerHTML:
	# 		found = True

	# logger.info("The variable was ")
	# logger.info(found)

	# import urllib
	# url = request.vars.url
	# f= urllib.urlopen(url);
	# # f = urllib.request.urlopen(url)
	# logger.info("\n\n\n\n\n\nURL\n")

	# htmlString = f.read();
	# # logger.info(htmlString);

	# if htmlString.find(element) > 0:
	# 	logger.info("\n\nFOUND!")
	# else:
	# 	logger.infO("\n\nNOT FOUND")

	# return status


@auth.requires_signature()
def delete_item():
	item_id = request.vars.id


	item = db(db.stocklist.id == item_id).select().first();
	logger.info("before delete");
	logger.info(item);


	db(db.stocklist.id == item_id).delete();

	# item = db(db.stocklist.id == item_id).select().first();

	# logger.info("after delete");
	# logger.info(item);

	if item is None:
		return ("error");

	# item.delete();

	return ("OK")
