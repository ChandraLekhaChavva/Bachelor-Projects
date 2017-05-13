package nyit.apl.KnightsTour;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;


/* Usage:
 * 
 * Select the size of the board, and the starting coordinates.
 * Click on 'Solution' to see the Knight's Tour
 * 
 * 'Play' and 'Stop' have not been enabled.
 */

// No idea why I'd to make two copies of the 'tour' function
// If I remove it from the initialisation of MyTour(), it says, 
// " Error: Could not find or load main class nyit.apl.KnightsTour.MyTour$1 "


public class MyTour extends ChessBoard 
{ 
	public static void main(String[] args) 
	{ // Initialise must be called to setup the gui 
		
		MyTour mt = new MyTour()
		{
			List<Move> tour(Move m)
			{
				List<Move> movesToBePlayed = new ArrayList<Move>(); 		// This is the list of moves that is generated
						Move[] movesFromThisCell = m.reachableMoves();		// List of moves from current cell
						Move[] movesFromNextCell, finalMoveList = null;		// List of moves from next cell
						Move finalMove = null;
						
						System.out.println(m.row + " " + m.col);
						resetMark();
						mark[m.row][m.col] = 1; 				// Marking initial position as 'visited'

						int min = 9;
						while(movesFromThisCell.length>0)		// while moves are still possible
						{
							System.out.println("computing...");
							min = 9;
							
		// Iterate over all the moves from current cell, find the one with the fewest onward moves					
		// Add that move to the list of moves to be played; set that move as current move; 
		// mark it 'visited'; repeat...
							
							for(int i=0;i<movesFromThisCell.length;i++)
							{
								movesFromNextCell = movesFromThisCell[i].reachableMoves();
								if(movesFromNextCell.length < min)
								{
									min = movesFromNextCell.length;
									finalMoveList = movesFromNextCell;
									finalMove = movesFromThisCell[i];
								}
							}
							movesFromThisCell = finalMoveList;
							mark[finalMove.row][finalMove.col] = 1;
							movesToBePlayed.add(finalMove);
						}
						System.out.println("Done");
						return movesToBePlayed;
			} 
		}
		;
		initialise(mt); 
	}
	
	@Override
	List<Move> tour(Move m)
	{
		List<Move> movesToBePlayed = new ArrayList<Move>(); 
				Move[] movesFromThisCell = m.reachableMoves();
				Move[] movesFromNextCell, finalMoveList = null;
				Move finalMove = null;
				
				System.out.println(m.row + " " + m.col);
				resetMark();
				mark[m.row][m.col] = 1; 

				int min = 9;
				while(movesFromThisCell.length>0)
				{
					System.out.println("computing...");
					min = 9;
					for(int i=0;i<movesFromThisCell.length;i++)
					{
						movesFromNextCell = movesFromThisCell[i].reachableMoves();
						if(movesFromNextCell.length < min)
						{
							min = movesFromNextCell.length;
							finalMoveList = movesFromNextCell;
							finalMove = movesFromThisCell[i];
						}
					}
					movesFromThisCell = finalMoveList;
					mark[finalMove.row][finalMove.col] = 1;
					movesToBePlayed.add(finalMove);
				}
				System.out.println("Done");
				return movesToBePlayed;
	} 
			
	
    private class MoveComparator implements Comparator<Move> 			// Not required.
    { 
    	@Override 
    	public int compare(Move o1, Move o2) 
    	{ 
    		// Pretty useless of a comparison 
    		return (o1.row - o2.row) + (o1.col - o2.col); 
    	} 
    }
}