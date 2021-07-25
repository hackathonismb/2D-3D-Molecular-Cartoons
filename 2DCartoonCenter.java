public class 2DCartoonCenter {
    public class XYZPoint{
        float xCoor;
        float yCoor;
        float zCoor;
        //Constructor to create points. Assumed to be floats and not integers
        public XYZPoint (float x, float y, float z) {
            xCoor = x;
            yCoor = y;
            zCoor = z;
        }

        float getX () {
            return xCoor;
        }
        float getY() {
            return yCoor;
        }
        float getZ() {
            return zCoor;
        }
    }
    
    //Given XYZPoint array, find the center
    XYZPoint findCenter(XYZPoint[] list){
        float xSum = 0; //total sum of x points
        float ySum = 0; //total sum of y points
        int pointsTotal = 0;

        for (int i = 0; i < list.length; i++){ //add x and y coordinates to sum total and increasing point counter
            xSum += list[i].getX();
            ySum += list[i].getY();
            pointsTotal++;
        }

        XYZPoint center = new XYZPoint((xSum/pointsTotal), (ySum/ pointsTotal), -1); //implicit conversion of quotient of float divided by int to float, z value doesn't matter
        return center;
    }

    //Given XYZPoint array, find the maximum X value
    float maximumX(XYZPoint[] list){
        float xMax = Float.NEGATIVE_INFINITY; //Float.MIN_VALUE is a small, non-negative number and can't be used if there are negatives 
        for (int i = 0; i < list.length; i++){ 
            if(list[i].getX() > xMax){
                xMax = list[i].getX();
            }
        }
        return xMax;
    }
    //Given XYZPoint array, find the minimum X value
    float minimumX(XYZPoint[] list){
        float xMin = Float.MAX_VALUE;
        for (int i = 0; i < list.length; i++){ 
            if(list[i].getX() < xMin){
                xMin = list[i].getX();
            }
        }
        return xMin;
    }
    //Given XYZPoint array, find the maximum Y value
    float maximumY(XYZPoint[] list){
        float yMax = Float.NEGATIVE_INFINITY;
        for (int i = 0; i < list.length; i++){ 
            if(list[i].getY() > yMax){
                yMax = list[i].getY();
            }
        }
        return yMax;
    }
    //Given XYZPoint array, find the minimum X value
    float minimumY(XYZPoint[] list){
        float yMin = Float.MAX_VALUE;
        for (int i = 0; i < list.length; i++){ 
            if(list[i].getY() < yMin){
                yMin = list[i].getY();
            }
        }
        return yMin;
    }
}