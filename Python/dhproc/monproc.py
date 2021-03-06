#!/usr/bin/python
# -*- coding: utf-8 -*-
# Ver 16 - 23 March 2017 -

import sys
import os
from os import system

sys.path.append(os.path.join(os.path.dirname(__file__), '../'))

import subprocess 
from subprocess import *
import time

import mysql.connector
from mysql.connector import errorcode
from db import * 

maxIdx = 11

idx = [None]*maxIdx
proc = [None]*maxIdx
arg = [None]*maxIdx
p = [None]*maxIdx

p_path = "/var/dhproc/"

cmd = "python3"
	
idx[1] = 1
idx[2] = 2
idx[3] = 3
idx[4] = 4
idx[5] = 5
idx[6] = 6
idx[7] = 7
idx[8] = 8
idx[9] = 9
idx[10] = 10

arg[1] = ""
arg[2] = ""
arg[3] = "0"
arg[4] = "1"
arg[5] = ""
arg[6] = ""
arg[7] = ""
arg[8] = ""
arg[9] = ""
arg[10] = ""

proc[1] = "main"
proc[2] = "getMeteo"
proc[3] = "scheduler"
proc[4] = "scheduler"
proc[5] = "setHistoryData"
proc[6] = "sendMail"
proc[7] = "setHistoryDataStatistic"
proc[8] = "syncTime"
proc[9] = "smartLights"
proc[10] = "getMeteoForecast"

dbstarted = False

while dbstarted == False: # wait until mysql server is not started
	time.sleep(2)
	# -- DB Connection ---------------------------
	try:
		db = mysql.connector.connect(**config)
		dbstarted = True
	except mysql.connector.Error as err:
		dbstarted = False
		if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
			print("Something is wrong with your user name or password")
		elif err.errno == errorcode.ER_BAD_DB_ERROR:
			print("Database does not exists")
		else:
			print(err)

cur = db.cursor()  
# -- END DB Connection ---------------------------



def get_process_id(name):
	child = subprocess.Popen(['pgrep', '-f', name], stdout=subprocess.PIPE, shell=False)
	response = child.communicate()[0]
	return [int(pid) for pid in response.split()]
			
def checkStatus(index, pid):
	if pid != "":
		try:
			os.kill(p[index], 0)
		except OSError:
			cur.execute("UPDATE tbproctl SET lastupdate = NOW(), sts = 1 WHERE id = %s" % (100+index))
			db.commit()	
			print (str(pid) + " - Running")
		else:
			cur.execute("UPDATE tbproctl SET lastupdate = NOW(), sts = 9 WHERE id = %s" % (100+index))
			db.commit()	
			print (str(pid) + " - NOT Running")
	
def log(t, m):
	sql = "insert into tblog (type,msg) VALUES (%s, %s)" 
	cur.execute(sql, (t,m))
	db.commit()
	cur.close		
			
def isNotInt(self, s):
	try:
		int(s)
		return False
	except ValueError:
		return True	

def checkProc():
	for num in range(1, maxIdx):
		checkStatus(num, p[num])
	print ("      ")	
	
# -- run once ----------#
for num in range(1, maxIdx):
	stringa = cmd + " " + p_path + proc[num] + ".py " + str(arg[num])
	stringa =stringa.strip()
	print (stringa)
	tmp = get_process_id(stringa)
	try:
		p[num] = tmp[0]
	except:
		p[num] = 0	
			
	try:
		id = p[num]
		idx = id[0]
		cur.execute("UPDATE tbproctl SET sts = %s WHERE id = %s" % (idx, 100+num))
		db.commit()	
	except:
		a=1		
						
while True:
	checkProc()
	time.sleep(1.0)		
