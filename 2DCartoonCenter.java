public class 2DCartoonCenter {
    public class XYZPoint{
        double xCoor;
        double yCoor;
        double zCoor;
        //Constructor to create points. Assumed to be doubles and not integers
        public XYZPoint (double x, double y, double z) {
            xCoor = x;
            yCoor = y;
            zCoor = z;
        }

        double getX () {
            return xCoor;
        }
        double getY() {
            return yCoor;
        }
        double getZ() {
            return zCoor;
        }
    }
    
    //Given XYZPoint array, find the center
    XYZPoint findCenter(XYZPoint[] list){
        double xSum = 0; //total sum of x points
        double ySum = 0; //total sum of y points
        int pointsTotal = 0;

        for (int i = 0; i < list.length; i++){ //add x and y coordinates to sum total and increasing point counter
            xSum += list[i].getX();
            ySum += list[i].getY();
            pointsTotal++;
        }

        XYZPoint center = new XYZPoint((xSum/pointsTotal), (ySum/ pointsTotal), -1); //implicit conversion of quotient of double divided by int to double, z value doesn't matter
        return center;
    }

    //Given XYZPoint array, find the maximum X value
    double maximumX(XYZPoint[] list){
        double xMax = Double.NEGATIVE_INFINITY; //Double.MIN_VALUE is a small, non-negative number and can't be used if there are negatives 
        for (int i = 0; i < list.length; i++){ 
            if(list[i].getX() > xMax){
                xMax = list[i].getX();
            }
        }
        return xMax;
    }
    //Given XYZPoint array, find the minimum X value
    double minimumX(XYZPoint[] list){
        double xMin = Double.MAX_VALUE;
        for (int i = 0; i < list.length; i++){ 
            if(list[i].getX() < xMin){
                xMin = list[i].getX();
            }
        }
        return xMin;
    }
    //Given XYZPoint array, find the maximum Y value
    double maximumY(XYZPoint[] list){
        double yMax = Double.NEGATIVE_INFINITY;
        for (int i = 0; i < list.length; i++){ 
            if(list[i].getY() > yMax){
                yMax = list[i].getY();
            }
        }
        return yMax;
    }
    //Given XYZPoint array, find the minimum X value
    double minimumY(XYZPoint[] list){
        double yMin = Double.MAX_VALUE;
        for (int i = 0; i < list.length; i++){ 
            if(list[i].getY() < yMin){
                yMin = list[i].getY();
            }
        }
        return yMin;
    }
    
    double xRange(XYZPoint[] list){
        return maximumX(list) - minimumX(list);
    }
    double yRange(XYZPoint[]list){
        return maximumY(list) - minimumY(list);   
    }
}
