#!/usr/bin/python
# Generates n_mazes number of mazes of size maze_w x maze_h
# using Prim's algorithm.
import random
import sys
import re


visited = dict()
maze_w= 24
maze_h = 12
n_mazes = 100

def flipCoin( p ):
    r = random.random()
    return r < p

def isLegalMove(x,y):
    return x > 0 and x < maze_w-1 and y > 0 and y < maze_h-1


def randMove(x,y):
    dx = 0 
    dy = 0
  
    while (dx == 0 and dy == 0 or (not isLegalMove(x+dx,y+dy))):
        r = random.random()
        print r
        if r <= 0.25:
            dx = 1
        elif r <= 0.5:
            dx = -1
        elif r <= 0.75:
            dy = 1
        else:
            dy = -1
        print x+dx,y+dy
    return (x+dx, y+dy)        

def legal_walls(rows,x,y):
    walls = []
    for w in [(x+1,y),(x-1,y),(x,y+1),(x,y-1)]:
        if (isLegalMove(w[0],w[1]) and rows[w[1]][w[0]] == "%"):
            walls.append(w)
    return walls  

def passage_across(rows,x,y):
    for w in [(x+1,y),(x-1,y),(x,y+1),(x,y-1)]:
        if (isLegalMove(w[0],w[1]) and rows[w[1]][w[0]] == " "):
            return w
    return False
      

def gen_maze_prim():
    rows = []
    walllst = []
    for i in range(maze_h):
        rows.append(['%']*maze_w)
    
    curr_x = 1
    curr_y = maze_h-2
    rows[curr_y][curr_x] = " "
    walllst.extend(legal_walls(rows,curr_x, curr_y))
   
    while len(walllst):
        nextWall = random.choice(walllst)
        src = passage_across(rows,nextWall[0],nextWall[1])
        if (src):
            dst = [src[0]-nextWall[0], src[1]-nextWall[1]]
            dst[0] = nextWall[0]-dst[0]
            dst[1] = nextWall[1] - dst[1]
            dst = tuple(dst)
            if (isLegalMove(dst[0], dst[1]) and rows[dst[1]][dst[0]] == "%"):
                rows[nextWall[1]][nextWall[0]] = " "
                rows[dst[1]][dst[0]] = " "
                walllst.extend(legal_walls(rows, dst[0], dst[1]))
            else:
                walllst.remove(nextWall)
        
    return rows

def manhattanDistance(x1, y1, x2, y2):
    return abs( x1 - x2 ) + abs( y1 - y2 )




for m in range(n_mazes):
    maze = []
    possible_food = []
    maze = gen_maze_prim()
    del(maze[0])
    for i in range(maze_h-1):
        for j in range(maze_w-1):
            if maze[i][j] == " " and manhattanDistance(1,maze_h-3,j,i) > 5:
                possible_food.append((i,j))
    food_loc = random.choice(possible_food)
    maze[food_loc[0]][food_loc[1]] = "."
    maze[maze_h-3][1]="1";

    for i in range(0,maze_h-1):
        maze[i] = maze[i][:-1]
        maze[i] = "".join(maze[i])
        maze[i] = '"' + maze[i] + '"' + ','
    maze[maze_h-2] = maze[maze_h-2].rstrip(",")
    print "[" + "\n".join(maze) + "],"


